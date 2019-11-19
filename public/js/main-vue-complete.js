document.addEventListener('DOMContentLoaded', () => {
    const Player = {
        props: ['player'],
        name: 'Player',
        template: `
        <div class="player" :data-number="player.number">
            <img :src="player.url">
            <p>{{ player.number }} {{ player.name }}</p>
        </div>
        `
    };

    new Vue({
        el: ".main",
        data: function() {
            return {
                players: [],
                selectedPlayers: [],
            };
        },
        created() {
            fetch("./players").then((res) => {
                return res.json();
            }).then((players) => {
                this.players = players;
            });
        },
        methods: {
            select (index) {
                const alreadySelected = this.selectedPlayers.some((player) => {
                    return player.number == this.players[index].number;
                });
                if (alreadySelected) {
                    return;
                }
                this.selectedPlayers.push(this.players[index]);
            },
            unselect (index) {
                this.selectedPlayers.splice(index, 1);
            }
        },
        components: {
            'player': Player
        }
    });
});
