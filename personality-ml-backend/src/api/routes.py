from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from src.model.predictor import ModelPredictor

router = APIRouter()
model_predictor = ModelPredictor('src/model/model.pkl')

class InputData(BaseModel):
    features: list

@router.post("/predict")
def predict(data: InputData):
    try:
        prediction = model_predictor.predict(data.features)
        return {"prediction": prediction}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

