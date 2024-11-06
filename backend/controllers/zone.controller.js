import Zone from "../models/zone.model.js";

export const createZone = async (req, res) => {
    const zone = req.body;

    if (!zone.zoneId || !zone.zoneLimit || !zone.zoneCurrentValue || !zone.zoneCycles) {
        return res.status(400).json({ 'success': false, 'message': 'please provide all the fields' });
    }

    const newZone = new Zone(zone);
    try {
        await newZone.save();
        return res.status(201).json({ 'success': true, 'data': newZone });
    } catch (err) {
        console.log("error in adding a new user", err.message);
        return res.status(500).json({ 'success': false, 'message': 'internal server error' });
    }
}

export const findZone = async (req, res) => {
    const { identifier } = req.body;

    try {
        const zone = await Zone.findOne({
            $or: [
                { zoneId: identifier }
            ]
        });
        if (zone) {
            return res.status(200).json({ 'success': true, 'data': zone });
        } else {
            return res.status(404).json({ 'success': false, 'message': 'no such zone found' });
        }

    } catch (err) {
        console.log("error in finding a new user", err.message);
        return res.status(500).json({ 'success': false, 'message': 'internal server error' });
    }
}

export const updateZone = async (req, res) => {
    const { id, increment, cycleId, newZoneCurrentValue } = req.query;

    try {
        if (increment === "false") {
            const updatedZone = await Zone.findByIdAndUpdate(
                id,
                {
                    zoneCurrentValue: newZoneCurrentValue,
                    $pull: { zoneCycles: { cycleId: cycleId } } // Only remove the cycleId provided
                },
                { new: true } // Return the updated document
            );
            return res.status(200).json({ 'success': true, 'data': updatedZone });

        } else if (increment === "true") {

            const zone = await Zone.findById(id);
            const cycleExists = zone.zoneCycles.some(cycle => cycle.cycleId === cycleId);
            if (cycleExists) {
                return res.status(200).json({ 'success': false, message: 'cycle already added' });
            }

            const updatedZone = await Zone.findByIdAndUpdate(
                id,
                {
                    zoneCurrentValue: newZoneCurrentValue,
                    $push: { zoneCycles: { cycleId: cycleId } } // adds the cycleId provided
                },
                { new: true } // Return the updated document
            );
            return res.status(200).json({ 'success': true, 'data': updatedZone });
        }
    } catch (err) {
        console.log("error in finding a new user", err.message);
        return res.status(500).json({ 'success': false, 'message': 'internal server error' });
    }
}
