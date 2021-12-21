const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')

                return userData;
            }

            throw new AuthenticationError('You are not logged In');
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

        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
    
            return { token, user };
        },
        // looks like the add thought from deep thoughts in the weekly module
        // there is no add book, it has to be save book according to the user-routes
        saveBook: async (parent, args, context) => {
            if(context.user){
            const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: args.input} },
                { new: true, runValidators: true }
            );

            return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');    
        },
        // remove should be about the same as the add book but a little different, may have to come back to this one

        removeBook: async (parent, args, context) => {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id},
                { $pull: { savedBooks: { bookId: args.bookId }}},
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