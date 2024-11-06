from random import random,randint, choice, seed
import json # name of the json 

seed(0)
with open('simSettings.json') as f:
    settings = json.load(f)
    
def trashIncrease(trashWeight: int, Capacity: int) -> int:
    trashCollected = random() * randint(0, Capacity - sum(trashWeight))
    ret = [*trashWeight]
    ret[0] += trashCollected//3
    ret[1] += trashCollected//3
    ret[2] += trashCollected//3
    return ret


# fixed var for one iteration
AirLineInfo = {}
numAirplaneJourneys = randint(settings["numAirplane"]["min"], settings["numAirplane"]["max"])
numCities = randint(settings["numCities"]["min"], settings["numCities"]["max"])
for i in range(numAirplaneJourneys):
    AirLineInfo[i] = {}
    AirLineInfo[i]["journey"] = [choice(range(numCities)) for _ in range(2)]
    AirLineInfo[i]["flightTime"] = randint(settings["flightTime"]["min"], settings["flightTime"]["max"])
    AirLineInfo[i]["workerNeeded"] = randint(settings["wokersAvailable"]["min"], settings["wokersAvailable"]["max"])
    AirLineInfo[i]["specialEquipmentNeeded"] = randint(settings["equipmentAvailable"]["min"], settings["equipmentAvailable"]["max"])
    AirLineInfo[i]["maxWeightCapacity"] = randint(settings["maxWeightCapacityPerAirplane"]["min"], settings["maxWeightCapacityPerAirplane"]["max"])
    AirLineInfo[i]["trashCollection"] = {0: [0, 0, 0] }
    for time in range(1,AirLineInfo[i]["flightTime"]+1):
        prevWeight = AirLineInfo[i]["trashCollection"][time-1]
        AirLineInfo[i]["trashCollection"][time] = trashIncrease(prevWeight, AirLineInfo[i]["maxWeightCapacityPerAirplane"])

# whole data structure    
data = {
    'numberOfAirplanes': numAirplaneJourneys,
    "AirLineInfo": AirLineInfo
} 

with open('sampleData.json', 'w') as f:
    json.dump(data, f, indent = 4)