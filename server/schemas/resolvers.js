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
        }
    },
}

module.exports = resolvers;