const { Schema, model } = require('mongoose');
const { reactionSchema } = require('./reactionModel');


// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            //Must be between 1 and 280 characters"
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            //Set default value to the current timestamp
            default: Date.now(),
            //Use a getter method to format the timestamp on query
            get: timestamp => new Date(timestamp).toISOString(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema], // Use reactionSchema as a nested subdocument
        //indicates that the reactions field in the Thought schema will contain an array of Reaction subdocuments.
    },
    {
        timestamps: true,
        toJSON: { getters: true, virtuals: true },
        id: false,
    },
);

// Create a virtual property `reactionCount` that gets the amount of reactions per thought
thoughtSchema.virtual('reactionCount')
    .get(function () {
        let reactionAmt = this.reactions.length;
        console.log(reactionAmt);
        return reactionAmt;
    });


// Initialize Thoughts model
const Thought = model('Thought', thoughtSchema);

Thought
    .create([
        { thoughtText: 'Lorem ipsum dolor sit amet..', username: 'bigbro' },
        { thoughtText: 'consectetur adipiscing elit, sed do eiusmod tempor.', username: 'bigbro' },
        { thoughtText: 'incididunt ut labore et dolore magna aliqua', username: 'officesweet' }
    ])
    .then(createdThoughts => {
        console.log(createdThoughts);
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = Thought;