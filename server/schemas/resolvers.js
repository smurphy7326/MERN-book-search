const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                // will have to work on this one, not sure if this is the full thing that we need. 
                const userData = await User.findOne({
                    _id: context.user._id
                })
                .select('-__v')

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
    },

    Mutation: {
        login: async (parent, {email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect login');
            }

            const correctPw = await user.isCorrectPassword(passord);

                if (!correctPw) {
                    throw new AuthenticationError('Incorrect password')
                }

                const token = signToken(user);
                return { token, user };
            },

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
    
            return { token, user };
        },
        // looks like the add thought from deep thoughts in the weekly module
        addBook: async (parent, args, context) => {
            if(context.user){
            const book = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: args} },
                { new: true, runValidators: true }
            );

            return book;
            }
            throw new AuthenticationError('You need to be logged in!');    
        },
        // remove should be about the same as the add book but a little different, may have to come back to this one

        removeBook: async (parent, args, context) => {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id},
                { $pull: { savedBooks: { bookId: args }}},
                { new: true }
            )
            if(!updatedUser){
                throw new AuthenticationError('Could not find a User with this ID');
            }
            return updatedUser;
        }
    }
};

module.exports = resolvers;