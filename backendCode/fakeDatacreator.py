import numpy as np
import json # name of the json 

# fixed var for one iteration
numberMealTypes = np.random.randint(4,10)
numberOfSubMealsPerMeal = np.random.randint(1,5, numberMealTypes)
maxWeightOfEachSubMeal = {}
for i in range(numberMealTypes):
    maxWeightOfEachSubMeal[i] = np.round(np.random.uniform(10,50, numberOfSubMealsPerMeal[i]),2) # max weight of each sub meal (leftover weight <= maxWeightofMeal)
    
# data creator
percentageMeal = np.random.rand(numberMealTypes)
percentageMeal = percentageMeal/sum(percentageMeal)
numOfCustomerOrderMealIndex = (percentageMeal * 180).astype(np.int32) # number of passangers in A320 and A321

# generate the percentage of left over for each customer for each meal type
leftoverData = {}
for i in range(numberMealTypes):
    # 2D array
    customerLeftover = np.random.rand(numOfCustomerOrderMealIndex[i], numberOfSubMealsPerMeal[i])
    # normalize to ensure the value is located at [0,1]
    customerLeftover = customerLeftover/np.max(customerLeftover)
    leftoverData[i] = np.round((customerLeftover*np.expand_dims(maxWeightOfEachSubMeal[i],axis=0)),2).tolist()

# whole data structure    
data = {
    'numberMealTypes': numberMealTypes,
    'numberOfSubMealsPerMeal': numberOfSubMealsPerMeal.tolist(),
    'maxWeightOfEachSubMeal': {str(k): v.tolist() for k, v in maxWeightOfEachSubMeal.items()},
    'numOfCustomerOrderMealIndex': numOfCustomerOrderMealIndex.tolist(),
    'leftoverData': leftoverData
} 

with open('meal_data.json', 'w') as f:
    json.dump(data, f, indent = 4)