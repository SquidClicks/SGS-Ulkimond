//==========================================================================
// Eli_FixAnalogMove.js
//==========================================================================

/*:
@plugindesc v1.2 - Fix direction problem with San_AnalogMove.js
@author Eliaquim or Rakuen Zero


@help 


============================================================================
Introduction
============================================================================

Originally the plugin San_AnalogMove.js has a problem with direction of
diagonal movement:

When going Up + Right the player turns his direction to the right, but 
stills go up.
When going Down + Left the player turns his direction to the left, but stills 
go down.
When going Right + Down the player turns his direction to down, but stills 
go right.
When going Left + Up the player turns his direction to up, but stills go 
left.

This can causes issues like the player to open doors that are triggered via 
player touch while he is facing another direction rather than the door.

============================================================================
Features
============================================================================

Fix direction problem with SAN_AnalogMove.js

============================================================================
How to use
============================================================================

Just make sure to put below SAN_AnalogMove.
In the plugin parameter "Three Buttons Stop Player" leave it as "false" if 
you want to use the default behavior of Rm Mv for character movement by 
pressing these three directional keys: 
up-left-right. 
low-up-right. 
Set it to "true" if you want the player to stop moving by pressing this 
combination of three directional buttons.

============================================================================
Terms of Use
============================================================================

1. It is mandatory to give the credits to Eliaquim or Rakuen Zero in the 
credits section of your game.
2. It can be used in free and commercial games.
3. Do not sell or say that you made this plugin.
4. Do not redistribute this plugin. Instead, give this link to the download:

============================================================================
Special thanks and considerations
============================================================================

The plugin is free. However, consider donating if possible.
This can help me with small expenses and motivation! Working with games
in Brazil is very difficult. But don't feel obligated. I hope my small 
contribution is also a fuel of hope for you to continue to make your games! 
Thank you! Happy Rpg Making!

============================================================================
Contact
============================================================================

Facebook - https://www.facebook.com/nascmento.eliaquim
RM Web - https://forums.rpgmakerweb.com/index.php?members/eliaquim.123037/
Centro Rpg Maker - https://centrorpg.com/index.php?action=profile

============================================================================
Updatelog - Log de atualizações
============================================================================
Version 1.3 - 01/02/2020
- Changes in the code for better readability.
Version 1.2 - 10/01/2019
- Inserted plugin parameter as a workaround for another problem of direction
and movement with the player, when three directional buttons are pressed.
- Updated help file!
Thanks to ShadowDragon.
Version 1.1 - 09/29/2019
- Fix the direction problem of the followers.
Version 1.0 - 09/27/2019
- Plugin release! 

@param Three Buttons Stop Player
@type boolean
@on Yes
@off No
@desc Stop player movement when 3 directional buttons are pressed at same time.
@default false



*/

/*:pt
@plugindesc v1.2 - Conserta um bug de direção que havia no plugin SAN_AnalogMove.
@author Eliaquim or Rakuen Zero

@help 

============================================================================
Introdução
============================================================================

Originalmente o plugin San_AnalogMove.js tem um problema com a direção do
player quando anda na diagonal:

Se apertar cima + direita, o jogador se direciona para direita, mas continua
andando para cima.
Se apertar baixo + esquerda, o jogador se direciona para esquerda, mas
continua andando para baixo.
Se apertar para direita + baixo, o jogador se direciona para baixo, mas
continua andando para direita.
Se apertar esquerda + cima, o jogador se direciona para cima, mas continua
andando para esquerda.

Isso faz com que o jogador entre em uma porta que está acima dele enquanto
olha para a direita, por exemplo.

============================================================================
Funcionalidades
============================================================================

Conserta um bug de direção que havia no plugin SAN_AnalogMove.

============================================================================
Como usar
============================================================================

Instale no plugin manager abaixo do SAN_AnalogMove.
No parâmetro de plugin "Three Buttons Stop Player" deixe-o como "false" se
deseja usar o comportamento padrão do Rm Mv para o movimento do personagem
ao pressionar essas três teclas direcionais:
- cima-esquerda-direita.
- baixo-cima-direita.
Coloque-o para "true" se desejar que o jogador pare de se mover ao apertar 
essa combinação de três botões direcionais.

============================================================================
Termos de uso
============================================================================

1. É obrigatório dar os créditos para Eliaquim ou Rakuen Zero na seção 
de créditos do seu jogo.
2. Pode ser usado em jogos gratuitos e comerciais.
3. Não venda e nem diga que foi você que fez esse plugin.
4. Não redistribua esse plugin. Ao invés disso, dê este link para o download:

===========================================================================
Contato
============================================================================

Facebook - https://www.facebook.com/rakuenzero/
Itch io - https://rakuenzero.itch.io/
RM Web - https://forums.rpgmakerweb.com/index.php?members/eliaquim.123037/
Centro Rpg Maker - https://centrorpg.com/index.php?action=profile

============================================================================
Log de atualizações
============================================================================
Versão 1.3 - 02/01/2020
- Modificações no código para melhor leitura.
Versão 1.2 - 01/10/2019
- Inserido um parâmetro de plugin para corrigir outro problema de direção e
movimento do player quando três botões direcionais são pressionados ao mesmo
tempo.
- Atualização do arquivo de ajuda.
Agradecimentos a ShadowDragon.
Versão 1.1 - 29/09/2019
- Corrigido o problema de direção com os seguidores.
Versão 1.0 - 27/09/2019
- Plugin lançado!

@param Three Buttons Stop Player
@text Três direcionais apertados param o jogador
@type boolean
@on Sim
@off Não
@desc Impede o jogador de se mover quando três botões direcionais são apertados ao mesmo tempo.
@default false

*/

"use strict";

var Imported = Imported || {};
Imported.Eli_FixAnalogMove = true;

var Eli = Eli || {};
Eli.FAM = Eli.FAM || {};

if(Imported.SAN_AnalogMove) {

Eli.Parameters = PluginManager.parameters('Eli_FixAnalogMove');
Eli.Param = Eli.Param || {};

Eli.Param.FixAnalogMove = {
	ThreeButtonsStopPlayer: JSON.parse(Eli.Parameters['Three Buttons Stop Player'])
};

// Overwrite default function
CharacterMover.radToDir4 = function(radian) {
};

// Overwrite default function
CharacterMover.dir8ToDir4 = function(dir8, dir4) {
};

function fixNormalDir() {
	const playerDir = $gamePlayer.direction();
		if (playerDir === 8 && Input.isPressed("down")) {
			return $gamePlayer.setDirection(2);
		}
		if (playerDir === 6 && Input.isPressed("left")) {
			return $gamePlayer.setDirection(4);
		}
		if (playerDir === 4 && Input.isPressed("right")) {
			return $gamePlayer.setDirection(6);
		}
		if (playerDir === 2 && Input.isPressed("up")) {
			return $gamePlayer.setDirection(8);
		}
};

function fixDiagonalDir() {
	const playerDir = $gamePlayer.direction();
		if(Input.isPressed("down") && (playerDir === 4 || playerDir === 6)) {		
			return $gamePlayer.setDirection(2);
		}
		if(Input.isPressed("left") && (playerDir === 2 || playerDir === 8)) {		
			return $gamePlayer.setDirection(4);
		}
		if(Input.isPressed("right") && (playerDir === 2 || playerDir === 8)) {		
			return $gamePlayer.setDirection(6);
		}
		if(Input.isPressed("up") && (playerDir === 4 || playerDir === 6)) {		
			return $gamePlayer.setDirection(8);
		}
};

// Fix direction of the player if 3 directional buttons are pressed.
function fixthreeinputs() {
	if (Input.isPressed("up") && Input.isPressed("right") && Input.isPressed("left")) {
		return $gamePlayer.setDirection(8);
	}
	if (Input.isPressed("up") && Input.isPressed("right") && Input.isPressed("down")) {
		return $gamePlayer.setDirection(6);
	}
};

// Player stop moving when 3 directional buttons are pressed. 
// Alias
Eli.FAM.Game_Player_canMove = Game_Player.prototype.canMove;
	Game_Player.prototype.canMove = function() {
		if(Eli.Param.FixAnalogMove.ThreeButtonsStopPlayer) {
			if (Input.isPressed("up") && Input.isPressed("right") && (Input.isPressed("left") || Input.isPressed("down"))) {
				return false;
			}
			if (Input.isPressed("down") && Input.isPressed("right") && Input.isPressed("left")) {
				return false;
			}
		}
	return Eli.FAM.Game_Player_canMove.call(this);
		
};

function fixFollowerDir(follower) {
	const playerDir = $gamePlayer.direction();
	const playerRealX = $gamePlayer._realX; 
	const playerRealY = $gamePlayer._realY;
	const followerRealX = $gamePlayer.followers().followers()[follower]._realX;
	const followerRealY = $gamePlayer.followers().followers()[follower]._realY;
		if(playerDir === 6  && playerRealX > followerRealX) {
			return $gamePlayer.followers().followers()[follower].setDirection(6);
		}
		if(playerDir === 4 && playerRealX < followerRealX) {
			return $gamePlayer.followers().followers()[follower].setDirection(4);
		}
		if(playerDir === 2 && playerRealY > followerRealY) {
			return $gamePlayer.followers().followers()[follower].setDirection(2);
		}
		if(playerDir === 8 && playerRealY < followerRealY) {
			return $gamePlayer.followers().followers()[follower].setDirection(8);
		}
}

// Overwrite default function
FollowerMover.prototype.updateCharacter = function() {
    const precedingCharacter = this.character().precedingCharacter();
    const preChaPosVec = precedingCharacter.posVec();
    const relPosVec = preChaPosVec.sub2(this._posVec);
    this.character().setPosVec(this._posVec);
    this.character().setDirVec(relPosVec);
};

// Alias
Eli.FAM.CharacterMover_update = CharacterMover.prototype.update;
	CharacterMover.prototype.update = function() {
		Eli.FAM.CharacterMover_update.call(this);
		const flw = [0, 1, 2];
		fixNormalDir();
		fixDiagonalDir();
		if(!Eli.Param.FixAnalogMove.ThreeButtonsStopPlayer) {
			fixthreeinputs();
		} 
		// else {
		// 	Eli.FAM.Game_Player_canMove();
		// }
		flw.forEach(fixFollowerDir);
};

} else {
	throw new Error('San_AnalogMove.js is missing!');
};