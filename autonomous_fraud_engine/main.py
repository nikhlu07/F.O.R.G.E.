import asyncio
import logging
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from datetime import datetime
import random

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Make sure to install the required packages:
# pip install fastapi "uvicorn[standard]"

# Import all the components using relative imports
from .data.types import Transaction
from .core.guards import AutonomousTransactionGuard
from .core.self_healing import SelfHealingFraudPipeline
from .core.resource_manager import AutonomousResourceManager
from .core.security import AutonomousSecurityManager
from .core.audit import AutonomousAuditManager

app = FastAPI(
    title="F.O.R.G.E. - Autonomous Fraud Engine",
    description="""**F**raud **O**verwatch & **R**esponse **G**eneration **E**ngine with autonomous capabilities.""",
    version="1.0.0",
)

# Instantiate core components
transaction_guard = AutonomousTransactionGuard()
self_healing_pipeline = SelfHealingFraudPipeline()
resource_manager = AutonomousResourceManager()
security_manager = AutonomousSecurityManager()
audit_manager = AutonomousAuditManager()

logger.info("✅ F.O.R.G.E. Core components instantiated.")

@app.get("/")
async def read_root():
    """Welcome endpoint."""
    return {"message": "Welcome to F.O.R.G.E. - The Autonomous Fraud Engine."}

@app.post("/transaction/")
async def screen_transaction(transaction: dict):
    """
    Receives a transaction, screens it for fraud, and returns the result.
    """
    logger.info(f"📥 New transaction received for screening: {transaction.get('transaction_id')}")
    # The guard expects a dictionary.
    screen_result = await transaction_guard.autonomous_transaction_screening(transaction)
    return {"transaction_id": transaction.get('transaction_id'), "status": "screened", "details": screen_result}

@app.websocket("/ws/engine-status")
async def websocket_endpoint(websocket: WebSocket):
    """
    Websocket endpoint to stream live status of the F.O.R.G.E. engine.
    """
    await websocket.accept()
    logger.info("🔌 WebSocket connection established.")
    try:
        # Simulate engine operations and send updates
        for i in range(10): # Simulate 10 cycles
            await websocket.send_json({"cycle": i+1, "status": "starting_cycle"})

            # 1. Simulate a new incoming transaction
            new_transaction = Transaction(
                transaction_id=f"txn_{int(datetime.now().timestamp())}_{i}",
                vendor=f"vendor_{random.choice(['A', 'B', 'C'])}_{random.randint(1,100)}",
                amount=random.uniform(50000, 20000000),
                description="Simulated procurement transaction",
                timestamp=datetime.now(),
                status="pending"
            )
            await websocket.send_json({
                "event": "new_transaction",
                "transaction_id": new_transaction.transaction_id,
                "amount": f"{new_transaction.amount:,.2f}"
            })
            await asyncio.sleep(0.5)

            # 2. Autonomous Transaction Screening
            result = await transaction_guard.autonomous_transaction_screening(new_transaction.__dict__)
            await websocket.send_json({
                "event": "transaction_screening",
                "transaction_id": new_transaction.transaction_id,
                "result": result
            })
            await asyncio.sleep(0.5)

            # 3. Periodic System Health Check & Self-Healing
            if i % 2 == 0:
                await websocket.send_json({"event": "health_check", "status": "running"})
                health_status = await self_healing_pipeline.autonomous_health_check()
                await websocket.send_json({
                    "event": "health_check",
                    "status": "completed",
                    "details": health_status
                })
                await asyncio.sleep(1)

            # 4. Periodic Resource Management
            if i % 3 == 0:
                await websocket.send_json({"event": "resource_management", "status": "running"})
                scaling_decision = await resource_manager.autonomous_scaling()
                await websocket.send_json({
                    "event": "resource_management",
                    "status": "completed",
                    "details": scaling_decision
                })
                await asyncio.sleep(0.5)

            # 5. Periodic Security Hardening
            if i % 4 == 0:
                await websocket.send_json({"event": "security_hardening", "status": "running"})
                hardening_actions = await security_manager.autonomous_security_hardening()
                await websocket.send_json({
                    "event": "security_hardening",
                    "status": "completed",
                    "details": hardening_actions
                })
                await asyncio.sleep(1)

        await websocket.send_json({"status": "simulation_finished"})

    except WebSocketDisconnect:
        logger.info("🔌 WebSocket connection closed.")
    except Exception as e:
        logger.error(f"WebSocket Error: {e}")
        await websocket.close(code=1011)

@app.get("/audit-report/")
async def get_audit_report(time_period: str = "last_24_hours"):
    """
    Generates and returns an audit report for a given time period.
    """
    logger.info(f"📊 Generating audit report for period: {time_period}")
    report = await audit_manager.generate_audit_report(time_period=time_period)
    return report

if __name__ == "__main__":
    import uvicorn
    # This allows running the app with `python -m autonomous_fraud_engine.main`
    logger.info("🚀 Starting F.O.R.G.E. FastAPI Server...")
    uvicorn.run("autonomous_fraud_engine.main:app", host="0.0.0.0", port=8000, reload=True)
