import { timeStamp } from 'console';
import mongoose from 'mongoose';


// this below is a schema or rules for a user to maybe login.
//so we see things like the type, the required and the unque
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    profilePicture: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },
    
}, {timestamps: true}

// the timestamp which is added above will help us to get the time of creation and the time of update

);

// we now need to create a model with the name (User, this is because mongoDb will add the other s authomatically for us making it Users)
// we see too that this model comprises the name Name and the Schema.
// we can use this model later when signing in a user. 

const User = mongoose.model('User', userSchema);

export default User;