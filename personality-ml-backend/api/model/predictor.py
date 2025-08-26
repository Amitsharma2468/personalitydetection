class ModelPredictor:
    def __init__(self, model_path='model/model.pkl'):
        import joblib
        self.model = joblib.load(model_path)