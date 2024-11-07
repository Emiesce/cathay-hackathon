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
def generateData():
    AirplaneInfo = {}
    numAirplaneJourneys = randint(settings["numAirplane"]["min"], settings["numAirplane"]["max"])

    for i in range(numAirplaneJourneys):
        AirplaneInfo[i] = {}
        AirplaneInfo[i]["workerNeeded"] = randint(settings["wokersAvailable"]["min"], settings["wokersAvailable"]["max"])
        AirplaneInfo[i]["specialEquipmentNeeded"] = randint(settings["equipmentAvailable"]["min"], settings["equipmentAvailable"]["max"])
        AirplaneInfo[i]["maxWeightCapacity"] = randint(settings["maxWeightCapacityPerAirplane"]["min"], settings["maxWeightCapacityPerAirplane"]["max"])
        AirplaneInfo[i]["trashCollection"] = {0: [0, 0, 0] }
        
        for time in range(1,6):
            prevWeight = AirplaneInfo[i]["trashCollection"][time-1]
            AirplaneInfo[i]["trashCollection"][time] = trashIncrease(prevWeight, AirplaneInfo[i]["maxWeightCapacity"])

    # whole data structure    
    data = {
        'numberOfAirplanes': numAirplaneJourneys,
        'flightTime': 5,
        "AirplaneInfo": AirplaneInfo
    } 

    with open('sampleData.json', 'w') as f:
        json.dump(data, f, indent = 4)
    
    return data