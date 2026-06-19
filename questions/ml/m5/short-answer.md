# Short Answer Questions

**1. Differentiate between Bagging and Boosting.**
**Answer:**
* **Execution:** Bagging trains models in parallel; Boosting trains models sequentially.
* **Data:** Bagging uses random bootstrap samples for each model; Boosting uses the entire dataset but dynamically updates the weights of the instances based on previous errors.
* **Goal:** Bagging primarily reduces variance (overfitting); Boosting primarily reduces bias (underfitting).

**2. Explain the mechanism of Error-Correcting Output Codes (ECOC) in classification.**
**Answer:** ECOC is used to map a multi-class problem to several binary problems. A matrix is created where each row represents a class and each column is a binary classifier. During training, each classifier learns to separate the data based on its column's binary mapping. During prediction, the output of all classifiers forms a binary string. The final prediction is the class whose original codeword has the minimum Hamming distance to the predicted binary string, allowing it to "correct" minor classification errors.

**3. Why is a Random Forest typically superior to a single, deep Decision Tree?**
**Answer:** A single deep decision tree usually overfits the training data, capturing noise and resulting in high variance. A Random Forest trains multiple deep trees on different data subsets (bootstrapping) and restricts the features evaluated at each split. By averaging the unpruned trees, the Random Forest retains the low bias of the deep trees but drastically reduces the variance, leading to better generalization on unseen data.

**4. What is the fundamental difference between Hard Voting and Soft Voting?**
**Answer:** Hard voting relies strictly on the discrete class labels predicted by the base models; the class with the most "votes" wins. Soft voting relies on the predicted probabilities; it averages the probability of each class across all classifiers, and the class with the highest average probability wins. Soft voting generally yields better performance if the base classifiers are well-calibrated, as it accounts for the confidence of the predictions.

**5. Briefly describe how you would set up a Stacking ensemble in practice.**
**Answer:**
1. Split the training data into two sets (often via k-fold cross-validation).
2. Train multiple diverse base models (e.g., a Random Forest, an SVM, and a KNN) on the first set.
3. Use these trained models to make predictions on the second set.
4. Use these predictions as the input features (training data) to train a meta-learner (e.g., Logistic Regression).
5. For final inference, pass new data through the base models, and feed their outputs to the meta-learner.
