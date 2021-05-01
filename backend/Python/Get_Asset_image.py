from daltonapi.api import Atom
import json
import sys

atom = Atom()
assetsImage = []
assetsName = []
def getAssets():

    temp = atom.get_asset(sys.argv[1])
    assetsImage.append(temp.image)
    assetsName.append(temp.name)

    image = assetsImage[0]
    name = assetsName[0]

    print(image)
    print(name)

getAssets()