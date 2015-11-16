/**
 * @constructor
 * A mole object represents a mole in the game.
 *
 * Moles need 3 variables
 *  - this.timeSpentUp: the amount of time a mole spends on the board before being removed
 *
 *  - this.occupiedHole: A DOM element representing the hole that a mole occupies
 *
 *  - this.moleElement: A DOM element that is created when a mole is created. This element
 *                 should be appended to occupiedHole when a mole emerges
 *
 */
function Mole(minUpTime, maxUpTime) {
    console.log('mollllleeeee!');

    // Give this.timeSpentUp a number value between minUpTime and maxUpTime.
    // HINT: use Mole.prototype.getRandomBetween
    /* YOUR CODE HERE */
    this.timeSpentUp = this.getRandomBetween(minUpTime, maxUpTime);


    // this.removed needs a value
    /* YOUR CODE HERE */

    this.removed = false;

    // this.occupiedHole needs a value. it should be a DOM element
    // HINT: use Mole.prototype.selectHole
    /* YOUR CODE HERE */

    this.occupiedHole = this.selectHole();

    // Create an HTML element to represent the Mole
    // and save it into this.moleElement
    // Don't forget to give our mole a proper css class!
    // Don't forget to call whackThisMole if the mole is clicked!
    /* YOUR CODE HERE */
    this.moleElement = $('<div class = "mole"> </div>');
    this.moleElement.click(this.whackThisMole.bind(this));

    // Moles always emerge when they are created.
    this.emerge();
}

/**
 * A mole emerges from it's mole hole!
 * This function must:
 *   mark that hole as occupied using the data-hole-occupied attribute.
 *   add the mole to the DOM. 
 *   use setTimeout() to remove the mole after this.timeSpentUp milliseconds
 *
 */
Mole.prototype.emerge = function() {
    /* YOUR CODE HERE */

    if ($(this.occupiedHole).attr('data-hole-occupied') === 'true') {
        return;
    }

    $(this.occupiedHole).append(this.moleElement);

    $(this.occupiedHole).attr('data-hole-occupied', 'true');

    setTimeout(this.removeMole.bind(this), this.timeSpentUp);

    // this.moleElement.click(this.whackThisMole.bind(this));
}

/**
 * This function should change a mole from the default state, to the
 * whacked state.
 * 
 * It should use the global variable scoreBoard to update the score.
 * This should change the data-score attribute, as well as what the 
 * user can see on the screen.
 *
 * It should cause the foundLove.png heart to appear behind the mole.
 * 
 * Then after one second it should remove the mole from the DOM.
 */
Mole.prototype.whackThisMole = function() {
    console.log(this);
    //$(this.moleElement).className += ('.in-love');
    $(this.moleElement).addClass('in-love');
    //debugger;

    // Love at last,

    // and the player scored!
    // (scoreboard is a global reference to a dom element)
    var newScore = parseInt(scoreBoard.attr('data-score')) + 1;
    scoreBoard.attr('data-score', newScore);
    scoreBoard.html(newScore);

    setTimeout(this.removeMole.bind(this), 1000);

}

/**
 * This function should remove the moleElement from the DOM.
 * It should also change the data-hole-occupied attribute back to
 * false so that other moles can occupy the hole. 
 */
Mole.prototype.removeMole = function() {
        console.log(this);
        if ($(this.occupiedHole).attr('data-hole-occupied') === 'true') {
            $(this.occupiedHole).empty();
            $(this.occupiedHole).attr('data-hole-occupied', 'false');


        }


    }
    /**
     * Select an element from the DOM. The element must be one of the 
     * mole holes and it must have an attriute data-hole-occupied with
     * a value of false. 
     * 
     * If all those conditions are met, return an HTML element. 
     * If those conditions cannot be met (i.e. every hole is already occupied)
     * then return undefined.
     */
Mole.prototype.selectHole = function() {
    // get all of the mole holes
    //select random hole via getRandomIntBetween
    //if select #mole-field === false
    //return HTML element
    // else return undefined
    var result = null;
    var random = this.getRandomBetween(0, 8);
    var occupied = $('.mole-hole')[random];
    // console.log(occupied instanceof jQuery);

    var occ2JQ = $(occupied);
    // console.log(occ2JQ instanceof jQuery);

    if (occ2JQ.attr("data-hole-occupied") === "false") {
        // console.log('inside if', occ2JQ);

        result = occ2JQ;
    } else {
        return undefined;
    }

    return result;

};

/**
 * This must return a random number in between min and max.
 */
Mole.prototype.getRandomBetween = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * This must return an integer in between min and max
 */
Mole.prototype.getRandomIntBetween = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
