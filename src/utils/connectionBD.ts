const mongoose = require('mongoose');
import { mongodbAccess } from '../../key';
export const connectionBD = async (): Promise<void> => {

    await mongoose.connect(mongodbAccess.URI ?? '', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    
    console.log("Connected with the BD!");

}