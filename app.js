function numGenerator(min, max) {
	var attackValue = Math.random() * (max - min) + min;
	attackValue = Math.floor(attackValue);
	return attackValue;
}

const app = Vue.createApp({
	data() {
		return {
			playerHealth: 100,
			monsterHealth: 100,
			msg: '',
			isGameOn: true,
			currentRound: 0,
			battleLog: [],
		};
	},
	watch: {
		playerHealth() {
			if (this.playerHealth <= 0) {
				this.isGameOn = false;
				if (this.monsterHealth <= 0) {
					this.msg = 'Its a Draw!';
				} else {
					this.msg = 'You Lose!';
				}
			}
		},
		monsterHealth() {
			if (this.monsterHealth <= 0) {
				this.isGameOn = false;
				if (this.playerHealth <= 0) {
					this.msg = 'Its a Draw!';
				} else {
					this.msg = 'You Win!';
				}
			}
		},
	},
	computed: {
		monsterBarStyle() {
			if (this.monsterHealth < 0) {
				return { width: '0%' };
			}
			return { width: this.monsterHealth + '%' };
		},
		playerBarStyle() {
			if (this.playerHealth < 0) {
				return { width: '0%' };
			}
			return { width: this.playerHealth + '%' };
		},
		specialAvailable() {
			if (this.currentRound % 3 != 0) {
				return true;
			}
			return false;
		},
		healAvailable() {
			if (this.currentRound % 5 != 0) {
				return true;
			}
			return false;
		},
	},
	methods: {
		newGame() {
			this.isGameOn = true;
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.msg = '';
			this.currentRound = 0;
			this.battleLog = [];
		},
		attackMonster() {
			this.currentRound++;
			var attackValue = numGenerator(5, 12);
			this.addToLog(true, attackValue, 'Monster', 'Player');
			this.monsterHealth -= attackValue;
			this.attackPlayer();
		},
		specialAttack() {
			this.currentRound++;
			var attackValue = numGenerator(10, 25);
			this.addToLog(true, attackValue, 'Monster', 'Player');
			this.monsterHealth -= attackValue;
			this.attackPlayer();
		},
		attackPlayer() {
			var attackValue = numGenerator(6, 15);
			this.addToLog(true, attackValue, 'Player', 'Monster');
			this.playerHealth -= attackValue;
		},
		heal() {
			this.currentRound++;
			var healValue = numGenerator(10, 18);
			if (this.playerHealth + healValue > 100) {
				this.playerHealth = 100;
			} else {
				this.playerHealth += healValue;
			}
			this.addToLog(false, healValue, 'Player');
			this.attackPlayer();
		},
		addToLog(isAttack, number, receiver, attacker = '') {
			if (isAttack == false) {
				this.battleLog.unshift({
					receiver: receiver,
					isAttack: isAttack,
					number: number,
				});
			} else {
				this.battleLog.unshift({
					attacker: attacker,
					receiver: receiver,
					isAttack: isAttack,
					number: number,
				});
			}
		},
		lose() {
			this.msg = 'You Surrendered!';
			this.isGameOn = false;
		},
	},
});

const vm = app.mount('#game');
