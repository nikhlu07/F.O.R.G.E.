import asyncio
import random
import hashlib
import json
import logging
import os
from datetime import datetime
from typing import Dict, Any, List
from dotenv import load_dotenv
import httpx

# Langchain imports
from langchain_openai import AzureChatOpenAI
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate

logger = logging.getLogger(__name__)
load_dotenv()

class SLM:
    def __init__(self):

        BASE_URL = "https://ravager-base.openai.azure.com/"
        API_KEY = os.getenv("API_KEY")
        API_VERSION = "2025-01-01-preview"
        DEPLOYMENT_NAME = "gpt-5-chat"

        self.model = AzureChatOpenAI(
                openai_api_key=API_KEY,
                azure_endpoint=BASE_URL,
                openai_api_version=API_VERSION,
                deployment_name=DEPLOYMENT_NAME,
                temperature=1,
                top_p=0.85,
                frequency_penalty=0.5,
                presence_penalty=1,
                request_timeout=60,  # Add timeout to prevent hanging
                max_retries=3  # Add retries for resilience
            )
        self.parser = JsonOutputParser()
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", "You are a fraud detection expert. Analyze the following transaction and provide a risk score between 0.0 and 1.0. Respond with only a JSON object with keys 'risk_score', 'reasoning', and 'confidence'."),
            ("user", "{transaction_data}")
        ])
        self.chain = self.prompt | self.model | self.parser
        self.model_loaded = True
        self.confidence_threshold = 0.8

    async def analyze_with_context(self, document: Dict, context: Dict, temperature: float = 0.1) -> Dict:
        data = {
            "document": document,
            "context": context
        }
        try:
            response = await self.chain.ainvoke({"transaction_data": json.dumps(data)})
            response["risk_factors"] = [] # The prompt doesn't ask for this, so I'll add it.
            return response
        except Exception as e:
            logger.error(f"Error calling SLM: {e}")
            return {
                "risk_score": 0.0,
                "reasoning": "Error analyzing with SLM.",
                "confidence": 0.0,
                "risk_factors": []
            }

    async def analyze_fraud_risk(self, claim_data: Dict, context: Dict, reasoning_mode: str = "step_by_step") -> Dict:
        data = {
            "claim_data": claim_data,
            "context": context,
            "reasoning_mode": reasoning_mode
        }
        try:
            response = await self.chain.ainvoke({"transaction_data": json.dumps(data)})
            response["analysis_method"] = reasoning_mode
            return response
        except Exception as e:
            logger.error(f"Error calling SLM: {e}")
            return {
                "risk_score": 0.0,
                "reasoning": "Error analyzing fraud risk with SLM.",
                "confidence": 0.0,
                "analysis_method": reasoning_mode
            }

class SingleStoreClient:
    def __init__(self):
        self.vectors = []
        self.metadata = []

    async def similarity_search(self, embedding: List[float], threshold: float = 0.8, limit: int = 10) -> List[Dict]:
        # Mock vector similarity search
        await asyncio.sleep(0.02)  # Simulate DB query time

        # Generate mock similar cases
        similar_cases = []
        for i in range(min(limit, 5)):  # Return up to 5 similar cases
            case = {
                "case_id": f"case_{i + 1}",
                "similarity_score": random.uniform(threshold, 1.0),
                "fraud_confirmed": random.choice([True, False]),
                "amount": random.randint(100000, 10000000),
                "description": f"Similar fraud case {i + 1}"
            }
            similar_cases.append(case)

        return similar_cases


class HederaBlockchainStorage:
    def __init__(self):
        self.stored_records = []
        self.audit_api_url = os.getenv("AUDIT_API_URL", "http://localhost:3000/api/audit")

    async def store_evidence(self, record: Dict[str, Any]) -> Dict[str, str]:
        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                res = await client.post(self.audit_api_url, json=record)
                res.raise_for_status()
                data = res.json()
                if data.get("ok"):
                    return {
                        "record_id": data.get("record_id") or data.get("topicSequenceNumber") or "",
                        "transaction_hash": data.get("transaction_hash") or data.get("transactionId") or ""
                    }
        except Exception as e:
            logger.error(f"Audit API call failed, falling back to local mock: {e}")

        # Fallback to local mock storage
        await asyncio.sleep(0.1)
        record_id = f"hedera_{hashlib.md5(str(record).encode()).hexdigest()[:16]}"
        stored_record = {
            "record_id": record_id,
            "timestamp": datetime.now().isoformat(),
            "block_height": random.randint(1000000, 9999999),
            "transaction_hash": f"tx_{hashlib.sha256(str(record).encode()).hexdigest()[:32]}",
            "data": record
        }
        self.stored_records.append(stored_record)
        logger.info(f"Stored evidence locally (mock): {record_id}")
        return {"record_id": record_id, "transaction_hash": stored_record["transaction_hash"]}
