package com.finsight.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    public static final String SHORT_PROMPT =
            "You are a financial assistant. The user has very little data. "
                    + "Give exactly 3 simple, cautious tips based only on this summary: %s";

    public static final String MEDIUM_PROMPT =
            "You are a financial coach. The user has moderate spending data. "
                    + "Analyze patterns and give exactly 3 personalized tips based on: %s";

    public static final String DEEP_PROMPT =
            "You are an expert financial advisor. The user has extensive spending history. "
                    + "Find trends, risks, and opportunities. Give exactly 3 detailed, data-driven tips based on: %s";

    private final OkHttpClient client = new OkHttpClient();

    @Value("${openai.key}")
    private String key;



    public String getAdvice(String summary) throws Exception {

        String json = """
    {
      "model":"openai/gpt-4o-mini",
      "messages":[
        {
          "role":"user",
          "content":"Here is a user's categorized spending summary: %s. Identify the largest spending category and any unusual patterns. Then give exactly 3 concise, practical, and personalized tips to help this user improve their financial habits. Avoid generic advice. Be specific to the data."
        }
      ]
    }
    """.formatted(summary);

        RequestBody body = RequestBody.create(
                json,
                MediaType.parse("application/json")
        );

        Request req = new Request.Builder()
                .url("https://openrouter.ai/api/v1/chat/completions")
                .post(body)
                .addHeader("Authorization", "Bearer " + key)
                .addHeader("Content-Type", "application/json")
                .addHeader("HTTP-Referer", "http://localhost")
                .addHeader("X-Title", "FinSight")
                .build();

        try (Response res = client.newCall(req).execute()) {

            String result = res.body().string();

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(result);

            return root
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();
        }

    }
    public String getAdviceWithPrompt(String summary, String promptTemplate) throws Exception {

        String prompt = String.format(promptTemplate, summary);

        String json = """
    {
      "model":"openai/gpt-4o-mini",
      "messages":[
        {
          "role":"user",
          "content":"%s"
        }
      ]
    }
    """.formatted(prompt);

        RequestBody body = RequestBody.create(
                json,
                MediaType.parse("application/json")
        );

        Request req = new Request.Builder()
                .url("https://openrouter.ai/api/v1/chat/completions")
                .post(body)
                .addHeader("Authorization", "Bearer " + key)
                .addHeader("Content-Type", "application/json")
                .addHeader("HTTP-Referer", "http://localhost")
                .addHeader("X-Title", "FinSight")
                .build();

        try (Response res = client.newCall(req).execute()) {
            return res.body().string();
        }
    }

}
