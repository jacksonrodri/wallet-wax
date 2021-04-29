from daltonapi.api import Atom
import json
import sys

atom = Atom()
assets = []
def getAssets():

    assets.append(atom.get_assets(owner=sys.argv[1]))

    print(assets)

getAssets()

    


