from daltonapi.api import Atom
import json
import sys

atom = Atom()
assetsImage = []
def getAssets():

    temp = atom.get_asset(sys.argv[1])
    assetsImage.append(temp.image)

    temp2 = assetsImage[0]

    print(temp2[:-4])

getAssets()