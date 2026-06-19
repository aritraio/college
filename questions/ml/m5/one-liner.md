# One-Liner Questions

1. **Question:** What is Ensemble Learning?
**Answer:** A machine learning paradigm where multiple models (often called weak learners) are trained to solve the same problem and combined to get better results.

2. **Question:** Define Hard Voting.
**Answer:** A combination scheme where the ensemble's prediction is the statistical mode (majority vote) of the predictions made by all base classifiers.

3. **Question:** Define Soft Voting.
**Answer:** A combination scheme where the ensemble predicts the class with the highest average predicted probability across all base classifiers.

4. **Question:** What are Error-Correcting Output Codes (ECOC)?
**Answer:** A technique that encodes multiple classes into binary strings, allowing binary classifiers to solve multi-class problems while providing resilience against classification errors.

5. **Question:** What is Bagging?
**Answer:** An ensemble method that trains independent base models in parallel on random bootstrap samples of the training data to reduce model variance.

6. **Question:** How do Random Forest Trees differ from standard Bagging?
**Answer:** Random Forest is an extension of Bagging specifically for decision trees that forces even more variation by selecting a random subset of features at every node split.

7. **Question:** Define Boosting.
**Answer:** A sequential ensemble technique where each subsequent model attempts to correct the residual errors made by the previous models, effectively reducing bias.

8. **Question:** What is AdaBoost?
**Answer:** Adaptive Boosting; a specific boosting algorithm that incrementally adjusts the weights of training instances, penalizing misclassifications heavily.

9. **Question:** Describe Stacking.
**Answer:** An ensemble method that trains multiple diverse base models and then uses a higher-level meta-model to learn how to optimally combine their predictions.

10. **Question:** What is the focus of Practical Evaluation for ensemble models?
**Answer:** The process of validating ensemble performance using cross-validation, out-of-bag error estimates, and comparing metrics against a single baseline model to justify the computational overhead.
