import Client from "../models/Client";
import Freelancer from "../models/Freelancer";

export const checkEmailExists = async (
    email: string
)  => {
    let exist = false;
    const client = await Client.findOne({where: {email}});

    if (client) {
        exist = true;
    } else {
        const freelancer = await Freelancer.findOne({where: {email}});

        if (freelancer) {
            exist = true;
        }
    }
    return exist;
}


