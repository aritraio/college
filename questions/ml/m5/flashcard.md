# Flashcards

**Flashcard 1**
*Front:* What are the two main sources of error that ensemble methods aim to reduce?
*Back:* Variance (mostly via Bagging) and Bias (mostly via Boosting).

**Flashcard 2**
*Front:* Bootstrap Sample
*Back:* A sample of data drawn from the original dataset with replacement, meaning the same data point can appear multiple times. Used in Bagging.

**Flashcard 3**
*Front:* Out-of-Bag (OOB) Error
*Back:* The evaluation metric used in Bagging/Random Forests calculated on the subset of training data that was *not* included in a specific bootstrap sample.

**Flashcard 4**
*Front:* Base Learner for Random Forest
*Back:* Unpruned Decision Trees. They are high-variance, low-bias models, making them perfect for Bagging architectures.

**Flashcard 5**
*Front:* Base Learner for AdaBoost
*Back:* Weak learners, most commonly Decision Stumps (decision trees with a depth of exactly 1).

**Flashcard 6**
*Front:* ECOC Matrix
*Back:* A coding matrix where rows represent classes and columns represent binary classifiers. Used to map multi-class predictions to binary outputs and decode them via Hamming distance.

**Flashcard 7**
*Front:* Meta-Learner
*Back:* The final algorithm in a Stacking ensemble that takes the predictions of the base estimators as its input features to make the ultimate prediction.

**Flashcard 8**
*Front:* Voting vs. Stacking
*Back:* Voting uses a simple, unlearned statistical rule (majority or average) to combine models. Stacking uses a machine learning algorithm to *learn* how to combine models.
