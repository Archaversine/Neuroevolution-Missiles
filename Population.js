
class Population
{
    constructor()
    {
        this.rockets = [];
        this.popsize = 100;
        this.matingPool = [];

        for (let i = 0; i < this.popsize; i++)
        {
            this.rockets[i] = new Rocket();
        }
    }

    run()
    {
        for (let i = 0; i < this.popsize; i++)
        {
            this.rockets[i].update();
            this.rockets[i].show();
        }
    }

    evaluate()
    {
        let maxfit = 0;

        for (let i = 0; i < this.popsize; i++)
        {
            this.rockets[i].calcFitness();
            
            if (this.rockets[i].fitness > maxfit)
            {
                maxfit = this.rockets[i].fitness;
            }
        }

        // normalize all values between 1 and 0
        for (let i = 0; i < this.popsize; i++)
        {
            this.rockets[i].fitness /= maxfit;
        }
        
        this.matingPool = [];

        // Add rockets to mating pool
        // rockets that did better are added to the mating pool more times 
        for (let i = 0; i < this.popsize; i++)
        {
            let n = this.rockets[i].fitness * 100;

            for (let j = 0; j < n; j++)
            {
                this.matingPool.push(this.rockets[i]);
            }
        }
    }

    selection()
    {
        let newRockets = [];

        for (let i = 0; i < this.rockets.length; i++)
        {
            let parentA = random(this.matingPool).dna;
            let parentB = random(this.matingPool).dna;

            let child = parentA.crossOver(parentB); // returns dna
            child.mutation();

            newRockets[i] = new Rocket(child);
        }

        this.rockets = newRockets;
    }
}