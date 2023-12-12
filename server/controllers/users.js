import User from "../models/auth.js";

export const getUsers = async (req, res) =>{
   const { page } = req.query;
   try {
       const users = await User.find().sort({ _id: -1});
       res.status(200).json({ result: users })
   } catch (error) {
       res.status(404).json(error);
   }
};

export const getUserDetails = async (req, res) =>{
   const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.status(200).json({name: user.name, userId: user._id, joined: user.createdAt, city: user.city, state: user.state, 
         address: user.address, activeRequest: user.activeRequest, books: user.books, });
    } catch (error) {
      res.status(404).json(error);
    }
};

export const updateUserProfile = async(req, res) =>{
    const { body: { name, city, userState, address }, params: { id }} = req;
    try {
        if (!name || !city || !userState || !address) return res.status(400).json({msg: 'Please fill in required fields'});
        const user = await User.findByIdAndUpdate({ _id: id }, { name, city, state: userState, address }, {new: true, runValidators: true})
        if (!user) return res.status(400).json({msg: 'No user with this Id'});
        res.status(200).json({ result: {name: user.name, city: user.city, state: user.state, address: user.address,}, msg: 'Your profile has been updated successfully' });
    } catch (error) { 
        res.status(400).json(error);
    }
};
export const updateUserBookCount = async(req, res) =>{
    const { userId, isIncreased} = req.body;
    try {
      const user = await User.findById(userId);
      let books;
      if (isIncreased === true){
        books = user.books + 1;
      }else{
        books = user.books - 1;
      };
      const updatedUser = await User.findByIdAndUpdate({ _id: userId }, { books }, {new: true, runValidators: true});
      res.status(200).json({ updatedUser, updatedUserId: userId, isIncreased });
    } catch (error) { 
        res.status(400).json(error);
    }
};
export const updateUserRequestCount = async(req, res) =>{
    const { userId, isIncreased } = req.body;
    try {
      const user = await User.findById(userId);
      let activeRequest;
      if (isIncreased === true){
        activeRequest = user.activeRequest + 1;
      }else{
        activeRequest = user.activeRequest - 1;
      };
      const updatedUser = await User.findByIdAndUpdate({ _id: userId }, { activeRequest }, {new: true, runValidators: true});
      res.status(200).json({ updatedUser, updatedUserId: userId, isIncreased });
    } catch (error) { 
        res.status(400).json(error);
    }
};
export const updateUserTradeCount = async(req, res) =>{
    try {
      for (let i = 0; i < req.body.length; i++){
        const user = await User.findById(req.body[i]);
        let tradeCount;
        tradeCount = user.completedTrades + 1;
        const updatedUser = await User.findByIdAndUpdate({ _id: req.body[i] }, { completedTrades: tradeCount }, {new: true, runValidators: true});
      }
      res.status(200).json({ msg: 'Trade counts successfully updated' });
    } catch (error) { 
        res.status(400).json(error);
    }
};

