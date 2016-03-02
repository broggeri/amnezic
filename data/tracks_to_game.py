
# ##################################################
# import

import sys
import src.main.py.game as game

# ##################################################
# main

if __name__ == "__main__":
    json_tracks_file = str(sys.argv[1]) if len(sys.argv) > 1 else 'tracks.json'
    json_game_file = str(sys.argv[2]) if len(sys.argv) > 2 else 'game.json'
    with open(json_game_file, 'w') as f:
        json_game = game.create(json_file=json_tracks_file)
        f.write(json_game.indented_json)
