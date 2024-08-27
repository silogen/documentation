---
sidebar_position: 1
---

# Common Parameters and Values

More detailed descriptions are available in the Open API documentation. The effect of the parameters and values will vary greatly depending on the model.

| Request body parameters | Required | Type                 | Description                                                                                                                                                                                                                                                |
| ----------------------- | -------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| model                   | Yes      | String               | **Name of the model**. Allowed values are provided by your SiloGen contact. You can use the API to list available models (see https://model-service.services.silogen.ai/docs).                                                                             |
| messages                | Yes      | List                 | **Combination of "role" and "content" lists**. This is the prompt. You can specify a single instruction or experiment with e.g. few shot prompts. Often sufficient with just "role":"user" and desired content, e.g. "content":"What is Poro LLM good at?" |
| collection              | No       | List                 | **List of collections for the RAG component**. Usually only one. Allowed values are provided by your SiloGen contact. Or, you can use the [RAG Document Collection Service API](../rag-document-collection-service.md) to list available collections.      |
| temperature             | No       | Number 0-2           | Zero (0) will keep the system output closely aligned with the retrieved information from the collection. Higher values allow more creativity from the model and generate different responses for the same input. Default is 0.2.                           |
| stream                  | No       | Boolean True / False | Streaming sends words as they are created by the language model one at a time, so you can show them as they are being generated.                                                                                                                           |
| max_tokens              | No       | Number               | Mainly to restrict output length.                                                                                                                                                                                                                          |
| extra_body              | No       | -                    | Additional RAG parameters can be given within the extra_body parameter.                                                                                                                                                                                    |
| alpha                   | No       | Number 0-1           | The **balance of vector search vs. keyword search** as part of the document retrieval. 0 equals pure keyword search, 1 equals pure vector search. Default value is 0.5.                                                                                    |
| top_k                   | No       | Number               | The **number of documents** to retrieve for each query as part of the retrieval. Higher number improves recall (more relevant documents), but at the cost of lower precision (more irrelevant documents). Default value is 4.                              |
| hybrid_search           | No       | Boolean True / False | Performs hybrid search as part of the document retrieval, which is a combination of pure vector search and keyword search.                                                                                                                                 |
