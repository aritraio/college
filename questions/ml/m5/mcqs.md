# MCQs

**1. What is the primary objective of ensemble learning methods?**
A) To increase the interpretability of a single model
B) To combine multiple models to improve overall generalization and performance
C) To reduce the size of the training dataset
D) To eliminate the need for hyperparameter tuning
**Answer:** B

**2. Which combination scheme simply outputs the class that receives the highest number of predictions from the base classifiers?**
A) Stacking
B) Hard Voting
C) Soft Voting
D) Error-Correcting Output Codes
**Answer:** B

**3. In the context of Bagging, what does the term stand for?**
A) Binary Aggregation
B) Boosting and Aggregating
C) Bootstrap Aggregating
D) Base Algorithm Grouping
**Answer:** C

**4. How does a Random Forest introduce diversity among its base decision trees?**
A) By training each tree on the exact same dataset but with different hyperparameters
B) By using different types of base learners (e.g., SVM, KNN)
C) By training each tree on a bootstrap sample and selecting a random subset of features at each node split
D) By sequentially updating the weights of misclassified instances
**Answer:** C

**5. Which of the following is a core characteristic of the Boosting mechanism?**
A) Models are built independently and in parallel
B) It inherently reduces variance but leaves bias unchanged
C) Models are built sequentially, with each new model focusing on the errors of previous ones
D) It relies on a meta-classifier to combine predictions
**Answer:** C

**6. In the AdaBoost algorithm, what happens to the weights of training instances that are correctly classified by the current weak learner?**
A) Their weights are increased
B) Their weights are decreased
C) Their weights remain unchanged
D) They are removed from the training set
**Answer:** B

**7. What specific problem do Error-Correcting Output Codes (ECOC) solve in ensemble learning?**
A) Preventing decision trees from overfitting
B) Decomposing a multi-class classification problem into multiple binary classification problems
C) Calculating the optimal learning rate for AdaBoost
D) Optimizing the meta-learner in a stacking architecture
**Answer:** B

**8. How does Stacking fundamentally differ from Bagging and Voting?**
A) Stacking uses majority voting instead of averaging
B) Stacking only uses decision trees as base learners
C) Stacking uses a secondary "meta-learner" trained on the outputs of the base models to make the final prediction
D) Stacking requires all base models to be of the exact same algorithm type
**Answer:** C

**9. When evaluating ensemble models practically, which metric indicates that your Random Forest has enough trees?**
A) When the Out-of-Bag (OOB) error stabilizes and stops decreasing
B) When training accuracy reaches exactly 100%
C) When the inference time exceeds a given threshold
D) When the base trees have a maximum depth of 1
**Answer:** A

**10. If an AdaBoost ensemble is overfitting the training data, what is the most logical practical intervention?**
A) Increase the number of boosting stages (estimators)
B) Decrease the number of boosting stages or introduce regularization (shrinkage)
C) Switch the base estimator to a highly complex, unpruned decision tree
D) Change the voting scheme from hard to soft
**Answer:** B
