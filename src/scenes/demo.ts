import Phaser, { Scene } from 'phaser'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import NinePatch from 'phaser3-rex-plugins/plugins/ninepatch.js';
import { CustomShapes } from 'phaser3-rex-plugins/templates/ui/ui-components';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class SpeechBubble extends CustomShapes {
    constructor(
        scene: Phaser.Scene,
        fillColor?: number,
        strokeColor?: number
    ) {
        super(scene, {
            create: { lines: 1 },
            update: function () {
                var radius = 20;
                var indent = 15;

                var left = 0, right = this.width,
                    top = 0, bottom = this.height, boxBottom = bottom - indent;
                var lines = this.getShapes()[0] as CustomShapes.Lines;
                lines
                    .lineStyle(2, this.getData('strokeColor'), 1)
                    .fillStyle(this.getData('fillColor'), 1)
                    // top line, right arc
                    .startAt(left + radius, top).lineTo(right - radius, top).arc(right - radius, top + radius, radius, 270, 360)
                    // right line, bottom arc
                    .lineTo(right, boxBottom - radius).arc(right - radius, boxBottom - radius, radius, 0, 90)
                    // bottom indent                    
                    .lineTo(right * 0.5, boxBottom).lineTo(right * 0.4, bottom).lineTo(right * 0.3, boxBottom)
                    // bottom line, left arc
                    .lineTo(left + radius, boxBottom).arc(left + radius, boxBottom - radius, radius, 90, 180)
                    // left line, top arc
                    .lineTo(left, top + radius).arc(left + radius, top + radius, radius, 180, 270)
                    .close();

            }
        })

        this
            .setData('fillColor', fillColor)
            .setData('strokeColor', strokeColor)

        scene.add.existing(this);
    }
}


export default class Demo extends Phaser.Scene
{
    rexUI!: RexUIPlugin;
    ninepatch!: NinePatch;
    
    
	constructor()
	{
		super('demo');
        
	}

	preload()
    {
        //this.load.setBaseURL('http://labs.phaser.io')

        this.load.image('blue_button0', 'images/blue_button00.png');
        this.load.image('blue_button1', 'images/blue_button01.png');
        
    }

    create() {
        //this.add.image(400, 100, 'blue_button0');
        /* this.ninepatch = this.rexUI.add.ninePatch({
            x: 0,
            y: 0,
            width: 200,
            height: 10,
            key: 'blue_button0',
            columns: [10, undefined, 10],
            rows: [10, undefined, 10],
        });
        this.add.existing(this.ninepatch); */
        
        var buttons = this.rexUI.add.buttons({
            x: 100, y: 300,
            orientation: 'y',

            buttons: [
                this.createButton(this, 'A'),
                this.createButton(this, 'B'),
            ],

            space: { item: 18 }

        })
            // Add a header child, which is not part of buttons
            .add(this.createButton(this, 'Header'),
                {
                    index: 0
                }
            )
            // Add a footer child, which is not part of buttons
            .add(this.createButton(this, 'Footer'))
            .layout() //Arrange position of all elements.
            .drawBounds(this.add.graphics(), 0xff0000) // Draw bounds on a graphics game objec

        var print = this.add.text(400, 0, '');

        buttons
            .on('button.click', function (button, index, pointer, event) {
                print.text += `Click button-${button.text}\n`;
                buttons.setButtonEnable(false)
                setTimeout(() => {
                    buttons.setButtonEnable(true)
                }, 1000);
            })
            .on('button.out', function () {
                print.text += 'Pointer-out\n';
            })
            .on('button.over', function () {
                print.text += 'Pointer-over\n';
            })

    }

    createButton = function (scene, text) {
        return scene.rexUI.add.label({
            width: 100,
            height: 40,
            //background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT),
            background: scene.rexUI.add.ninePatch({
                x: 0,
                y: 0,
                width: 200,
                height: 10,
                key: 'blue_button0',
                columns: [10, undefined, 10],
                rows: [10, undefined, 10],
            }),
            text: scene.add.text(0, 0, text, {
                fontSize: 18
            }),
            space: {
                left: 10,
                right: 10,
            }
        });
    }
}

