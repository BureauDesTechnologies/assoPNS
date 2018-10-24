/**
 * Created by Lucas OMS on 22/10/2018.
 */

export class Emotes {
    /**
     * First element is the emote text, second is the link of the img to display
     * @type {MapConstructor<string, string>}
     */
    static all: Map<string, string> = new Map(
        [
            [':)', 'assets/emotes/smile.png'],
            [':D', 'assets/emotes/big_smile.png']
        ]
    );
}
