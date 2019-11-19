$(function(){
  const selector = new PlayerSelector($('.selected-players'), $('.player-list'));
  selector.showPlayerList();
});

class PlayerSelector {
    constructor(selectedPlayersElement, playerListElement) {
        this.selectedPlayersElement = selectedPlayersElement;
        this.playerListElement = playerListElement;
    }

    showPlayerList() {
        this.playerListElement.empty();
        fetch("./players").then((res) => {
            return res.json();
        }).then((players) => {
            for (let i = 0; i < players.length; i++) {
                const div = $(document.createElement("div"));
                const img = $(document.createElement("img"));
                const p = $(document.createElement("p"));
                div.addClass('player');
                div.attr('data-number', players[i].number);
                div.on('click', (e) => {
                    this.select($(e.currentTarget).clone());
                });
                img.attr('src', players[i].url);
                p.text(`${players[i].number} ${players[i].name}`);
                div.append(img);
                div.append(p);
                this.playerListElement.append(div);
            }
        });
    }

    select(element) {
        const selectedNumber = element.attr('data-number');
        const sameNumberPlayers = this.selectedPlayersElement.children().filter(`div[data-number='${selectedNumber}']`);
        if (sameNumberPlayers.length > 0) {
            return;
        }

        element.on('click', e => {
            $(e.currentTarget).detach();
        });

        this.selectedPlayersElement.append(element);
    }
}
