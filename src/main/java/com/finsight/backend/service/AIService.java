package com.finsight.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AIService {

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
              "content":"Analyze this spending and give 3 short tips: %s"
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
}
