import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { part, question, transcript } = await req.json();

    if (!part || !question || !transcript) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert IELTS Speaking examiner. You will score a candidate's spoken response based on the four IELTS Speaking assessment criteria. Be fair, constructive, and specific in your feedback.

You MUST respond by calling the "score_response" function with accurate scores and detailed feedback.

Scoring guidelines:
- Band 9: Expert user. Full command of the language.
- Band 7-8: Good to very good user. Generally handles complex language well.
- Band 5-6: Modest to competent user. Partial command with some errors.
- Band 3-4: Limited user. Basic competence is limited.
- Band 1-2: Extremely limited. Essentially no ability.

Consider:
- For Part 1: Expect shorter, simpler answers (30-60 seconds)
- For Part 2: Expect a longer monologue (1-2 minutes) covering cue card points
- For Part 3: Expect more complex discussion with abstract ideas

Be encouraging but honest. Provide specific examples from the transcript in your feedback.`;

    const userPrompt = `IELTS Speaking Part ${part}

Question: ${question}

Candidate's Response (transcribed from speech):
"${transcript}"

Please score this response on all four criteria (each from 1.0 to 9.0 in 0.5 increments) and provide detailed feedback. Also calculate an overall band score and provide a sample answer for comparison.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "score_response",
              description: "Return IELTS Speaking scores and feedback for a candidate's response",
              parameters: {
                type: "object",
                properties: {
                  scores: {
                    type: "object",
                    properties: {
                      fluencyCoherence: { type: "number", description: "Score from 1.0 to 9.0" },
                      lexicalResource: { type: "number", description: "Score from 1.0 to 9.0" },
                      grammaticalRange: { type: "number", description: "Score from 1.0 to 9.0" },
                      pronunciation: { type: "number", description: "Score from 1.0 to 9.0" },
                    },
                    required: ["fluencyCoherence", "lexicalResource", "grammaticalRange", "pronunciation"],
                    additionalProperties: false,
                  },
                  feedback: {
                    type: "object",
                    properties: {
                      fluencyCoherence: { type: "string", description: "Detailed feedback on fluency and coherence" },
                      lexicalResource: { type: "string", description: "Detailed feedback on vocabulary usage" },
                      grammaticalRange: { type: "string", description: "Detailed feedback on grammar" },
                      pronunciation: { type: "string", description: "Feedback on pronunciation (based on text patterns)" },
                      overall: { type: "string", description: "Overall summary and tips for improvement" },
                      sampleAnswer: { type: "string", description: "A band 8-9 sample answer for the same question" },
                    },
                    required: ["fluencyCoherence", "lexicalResource", "grammaticalRange", "pronunciation", "overall", "sampleAnswer"],
                    additionalProperties: false,
                  },
                  overallBand: { type: "number", description: "Overall band score from 1.0 to 9.0" },
                },
                required: ["scores", "feedback", "overallBand"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "score_response" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      throw new Error("No scoring result from AI");
    }

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("score-speaking error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
