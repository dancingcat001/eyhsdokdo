import { GoogleGenAI, Type } from "@google/genai";

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
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

export default async function handler(req: any, res: any) {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

  const { keywords } = req.body || {};

  if (!keywords || keywords.trim().length === 0) {
    return res.status(400).json({ error: "키워드를 입력해 주세요." });
  }

  try {
    const ai = getGeminiClient();
    if (!process.env.GEMINI_API_KEY) {
      // Offline fallback
      return res.status(200).json({
        reflection: `이번 한·일 공동 역사 교안 및 독도 평화 수업을 통해 역사적 사료의 가치를 깊이 깨달았습니다. 특히 '${keywords}' 키워드를 중심으로 고민해 보았을 때, 국가 간의 감정적 왜곡을 넘어 공명정대한 실증 기록을 토대로 역사적 사실을 인식하는 것이 한일 미래 세대의 진정한 학술적 교존과 상생의 평화 공동체를 형성하는 핵심 열쇠임을 절실히 느꼈습니다.`
      });
    }

    const prompt = `
당신은 중·고등학교 역사 및 평화 교육 전문가이자 고운 문장을 구사하는 전문 에세이스트입니다.
역사 수업(독도 및 동해의 평화적 교육 주제)을 마친 한국 혹은 일본 학생의 관성에서, 수업 소감을 담은 '소감문(성찰 일지)'을 자동 완성해 주어야 합니다.

[작성 지침]
- 학생이 직접 학습하고 마음으로 느낀 것처럼 자연스럽고 진정성 있는 어조(한글 존댓말 어조, '~라고 느꼈습니다', '~배웠습니다', '~다짐하게 되었습니다' 등)로 작성해 주세요.
- 사용자가 입력한 키워드를 문장 맥락 속에 자연스럽게 포함시켜야 합니다. (입력 키워드: ${keywords})
- 분량: 3~4문장 내외의 아름답고 간결하며 뜻이 깊은 문단을 완성해 주세요.
- 영토적 갈등이나 감정적 대립 구도에서 탈피하여, 공인된 고전 사료에 나타난 객관적 증거력을 존중하고 조화로운 평화 공존을 향해 나아가겠다는 다짐을 수려하게 장식해 주세요.

출력할 때 아래의 JSON 형식 형태로만 정확히 대답해 주세요:
{
  "reflection": "여기에 완성된 한글 소감문 텍스트를 입력하세요"
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reflection: {
              type: Type.STRING,
              description: "완성된 한글 소감문 텍스트"
            }
          },
          required: ["reflection"]
        }
      }
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("Gemini API가 빈 응답을 반환했습니다.");
    }

    const result = JSON.parse(textOutput.trim());
    return res.status(200).json(result);

  } catch (error: any) {
    console.error("Gemini Reflection API Error:", error);
    return res.status(500).json({
      error: "소감문 생성 중 장애가 발생했습니다.",
      details: error.message
    });
  }
}
