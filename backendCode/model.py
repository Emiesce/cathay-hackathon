import matplotlib.pyplot as plt
import numpy as np 

from sklearn import datasets, linear_model
from sklearn.metrics import mean_squared_error, r2_score
from sampleDatacreator import generateData
from sklearn.model_selection import train_test_split
import json




# y is the predicting label (trash at t=5, num of worker and num of equipment)
# x is the feature
def getY(sampleData):
    t5_pred_label = []
    workforceNeeded = []
    specialEquipmentNeeded = []

    for i in range(len(sampleData)):
        t5_pred_label.append(sampleData[i]["trashCollection"][5])
        workforceNeeded.append(sampleData[i]["workerNeeded"])
        specialEquipmentNeeded.append(sampleData[i]["specialEquipmentNeeded"])
        
    t5_pred_label = np.array(t5_pred_label)
    workforceNeeded = np.array(workforceNeeded).reshape(-1,1)
    specialEquipmentNeeded = np.array(specialEquipmentNeeded).reshape(-1,1)
    Y = np.hstack((t5_pred_label, workforceNeeded, specialEquipmentNeeded))
    return Y

def getX(sampleData):
    maxWeightCapacity = []
    trashCollection = []
    
    for i in range(len(sampleData)):
        maxWeightCapacity.append(sampleData[i]["maxWeightCapacity"])
        for j in range(6):
            trashCollection.append(sampleData[i]["trashCollection"][j])
    
    maxWeightCapacity = np.array(maxWeightCapacity).reshape(-1,1)
    trashCollection = np.array(trashCollection).reshape(len(sampleData),-1)
    X = np.hstack((maxWeightCapacity, trashCollection))
    
    return X


data = generateData()
sampleData = data["AirplaneInfo"]


Y = getY(sampleData) # (N,5)
X = getX(sampleData) #(N,19)

# ken look at the sampleData.json file, that is the fake data creator, what we want to pred is (expected trash, user)

# please change axis to what u wanna call

trainX, testX, trainY, testY = train_test_split(X, Y, test_size=0.2, random_state=65)

regr = linear_model.LinearRegression()

regr.fit(trainX, trainY)

predY = regr.predict(testX)

fig, axes = plt.subplots(1, 3, figsize=(15, 5))
target_names = ['Trash at t=5', 'Workforce Needed', 'Special Equipment']

for i in range(3):
    axes[i].scatter(testX[:, 0], testY[:, i], color='black', label='Actual')
    axes[i].scatter(testX[:, 0], predY[:, i], color='blue', label='Predicted')
    axes[i].set_title(f'Predictions for {target_names[i]}')
    axes[i].set_xlabel('Max Weight Capacity')
    axes[i].set_ylabel(target_names[i])
    axes[i].legend()

plt.tight_layout()
plt.show()

for i in range(3):
    print(f"\nMetrics for {target_names[i]}:")
    print(f"Mean squared error: {mean_squared_error(testY[:, i], predY[:, i]):.4f}")
    print(f"R² score: {r2_score(testY[:, i], predY[:, i]):.4f}")