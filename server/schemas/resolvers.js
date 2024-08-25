const { signToken, AuthenticationError } = require("../utils/auth");
const { User } = require("../models");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }, context) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
          const userData = await User.findOneAndUpdate(
        //   filter (what are you using to find the user)
              {_id: context.user._id},
            //   content to update
              {$push: { savedBooks: bookData }},
              { new: true }
          );

          return userData
      }
      throw AuthenticationError;
    },
    removeBook: async (parent, { bookId }, context) => {
        if (context.user) {
            const userData = await User.findOneAndDelete(
                { _id: context.user._id }, { $pull: { savedBooks: bookId } }, { new: true }
            ); 

            return userData

      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
