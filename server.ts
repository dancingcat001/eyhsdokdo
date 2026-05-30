import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialize Gemini API client to prevent startup crash if key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("⚠️ Warning: GEMINI_API_KEY env variable is not set. API calls will fail.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY_FOR_BUILD",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. API Route: Evaluate joint textbook draft
app.post("/api/evaluate", async (req, res) => {
  const { names, title, content, discussions } = req.body;

  if (!content || content.trim().length === 0) {
    return res.status(400).json({ error: "교과서 서술문 내용을 입력해주세요." });
  }

  try {
    const ai = getGeminiClient();
    if (!process.env.GEMINI_API_KEY) {
      // Return a simulated high-quality educational feedback if API key is not configured, so it runs gracefully
      return res.json({
        score: 85,
        feedback: "교과서 서술의 형식이 잘 갖추어졌으나, API 키가 설정되지 않아 로컬 심사 모드로 검토되었습니다. 작성된 초안은 『세종실록지리지』나 『태정관 지령』 등 중요한 역사적 근거를 풍부히 활용하는 방향으로 보완될 수 있습니다. 전체적으로 객관적이고 사실 위주의 어조로 서술하려는 시도가 돋보입니다.",
        suggestions: [
          "역사적 근거(예: 1877년 태정관 지령)를 심도 있게 2개 이상 구체적으로 인용해보세요.",
          "문장에서 감정적인 형용사나 주관적인 호칭보다는 사실관계(Fact)를 부각하는 역사적 명칭을 적극 사용하여 평화로운 어조를 유지해보세요.",
          "미래 세대(한일 동아시아)가 상호 조화롭게 동해를 '평화와 협력의 바다'로 일구어갈 수 있는 평화 지향적 비전을 끝맺음으로 강화할 수 있습니다."
        ],
        signature: "초학학술원 공동교과서 집필 심사단"
      });
    }

    const prompt = `
당신은 '대한민국 역사·지리 평화교육위원회'의 공동대표이자, 역사 및 지리 교육을 연구하는 전문 평가위원입니다.
중·고등학생들이 수업 활동의 일환으로 한·일 평화 공동 동아시아 교과서에 영토로서의 독도를 어떻게 공동 서술할 것인지 토의하여 제출한 초안에 대해 친근하면서도 객관적이고 전문적인 동료 피드백 및 심사 성적표를 작성해야 합니다.

[작성 제출 정보]
- 모둠 학생 이름: ${names || "미기입"}
- 제안한 독도 단원의 제목: ${title || "미기입"}
- 제출한 공동 집필 본문 (10줄 이내):
"${content}"
${discussions && discussions.length > 0 ? `\n[수업 성찰 및 토론 답변 내용]:\n${discussions.map((d: string, idx: number) => `성찰 ${idx+1}: ${d}`).join("\n")}` : ""}

[심사 평가 항목 및 가이드라인]
1. 사료 활용도 (근거성): 세종실록지리지, 신증동국여지승람, 만기요람, 대한제국 칙령 제41호, 은주시청합기, 조선국 교제시말 내탐서, 태정관지령, 팔도총도, 개정일본여지로정전도, 삼국접양지도 등 공인된 한·일 고문서나 옛 지도가 2개 이상 구체적인 역사적 근거로 제시되었는가?
2. 상호 평화적 관점 (객관성): 일방적인 배척이나 자극적인 감정 표현을 배제하고 사실(Fact) 중심으로 객관적이고 중립적인 서술을 하고 있는가? 갈등을 넘어 평화적이고 상생적인 미래 동아시아의 모습을 지향하는가?
3. 분량 및 구성 (적절성): 10줄 이내의 간결하고 응집성 있는 문장으로 짜여졌는가?

상기 기준을 정밀히 채점하고, 비판적이지만 격려하는 다스한 어조로 심사위원 의견과 가치 있는 피드백을 한글로 제시해 주십시오. 반드시 아래 JSON 형식에 맞추어 출력해 주십시오.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.INTEGER,
              description: "심사 평가 점수 (0점부터 100점 사이)"
            },
            feedback: {
              type: Type.STRING,
              description: "학생들의 초안과 성찰 답변에 대한 종합적인 격려와 자세한 가이드라인 피드백 (한국어, 줄바꿈 자유롭게)"
            },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "초안 작성을 더 풍성하고 엄밀하게 하기 위한 3개 핵심 상세 수정 제안 사항 리스트"
            },
            signature: {
              type: Type.STRING,
              description: "심사를 담당한 위원 명의 서명 (예: '대한민국 역사·지리 평화교육위원회 수석평가위원' 등 신상 명칭)"
            }
          },
          required: ["score", "feedback", "suggestions", "signature"]
        }
      }
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("Gemini API가 빈 응답을 반환했습니다.");
    }

    const evaluationResult = JSON.parse(textOutput.trim());
    return res.json(evaluationResult);

  } catch (error: any) {
    console.error("Gemini Evaluation API Error:", error);
    return res.status(500).json({
      error: "평가 시스템 처리 중 장애가 발생했습니다.",
      details: error.message
    });
  }
});

// 2. Serve static or dev files via Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express Server is now running on http://localhost:${PORT}`);
  });
}

startServer();
