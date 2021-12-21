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
        

    }
}

module.exports = resolvers;