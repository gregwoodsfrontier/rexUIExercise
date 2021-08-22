import Phaser from 'phaser'
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import RoundRectanglePlugin from 'phaser3-rex-plugins/plugins/roundrectangle-plugin.js'
import NinePatchPlugin from 'phaser3-rex-plugins/plugins/ninepatch-plugin.js';

import Demo from './scenes/demo'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }],
		global: [{
			key: 'rexRoundRectanglePlugin',
			plugin: RoundRectanglePlugin,
			start: true
		},
		{
			key: 'rexNinePatchPlugin',
            plugin: NinePatchPlugin,
            start: true
		}]
    },
	scene: [Demo]
}

export default new Phaser.Game(config)
