import Cycle from "../models/cycle.model.js";

export const createCycle = async (req, res) => {
    try {
        const { cycleId, zoneId, entryExitTimes } = req.body;

        if (!cycleId || !zoneId || !Array.isArray(entryExitTimes)) {
            return res.status(400).json({ message: "invalid input data" });
        }

        const newCycle = new Cycle({ cycleId, zoneId, entryExitTimes, });
        await newCycle.save();
        return res.status(201).json({ 'success': true, 'data': newCycle });

    } catch (error) {
        console.error("Error creating cycle:", error.message);
        return res.status(500).json({ message: "internal server error" });
    }
};

export const findCycle = async (req, res) => {
    const { cycleId } = req.query;

    try {
        const cycle = await Cycle.findOne({ cycleId });
        if (!cycle) {
            return res.status(404).json({ 'success': false, message: 'cycle not found' });
        }
        return res.status(200).json({ 'success': true, 'data': cycle });

    } catch (error) {
        console.error("Error finding cycle:", error.message);
        return res.status(500).json({ 'success': false, message: 'internal server error' });
    }
}

export const deleteCycle = async (req, res) => {
    const { _id } = req.params;

    try {
        const deletedCycle = await Cycle.findOneAndDelete({ _id });
        if (!deletedCycle) {
            return res.status(404).json({ 'success': false, message: 'cycle not found' });
        }
        return res.status(200).json({ 'success': true, message: 'cycle deleted' });

    } catch (error) {
        console.error("Error deleting cycle:", error.message);
        return res.status(500).json({ 'success': false, message: 'internal server error' });
    }
};

export const updateCycleExitTime = async (req, res) => {
    const { cycleId } = req.params;
    const { newExitTime } = req.body;

    try {

        const cycle = await Cycle.findOne({ cycleId });

        // Check if the cycle was found
        if (!cycle) {
            return res.status(404).json({ 'success': true, message: "cycle not found" });
        }

        // Check if entryExitTimes is not empty
        // if (cycle.entryExitTimes.length === 0) {
        //     return res.status(400).json({ message: "No entryExitTimes to update" });
        // }

        // Update the exit time of the last entryExit time
        const lastIndex = cycle.entryExitTimes.length - 1;
        cycle.entryExitTimes[lastIndex].exit = newExitTime;

        // Save the updated cycle
        await cycle.save();

        // Send the updated cycle in the response
        res.status(200).json({ message: "Exit time updated successfully", cycle });
    } catch (error) {
        console.error("Error updating exit time:", error);
        res.status(500).json({ message: "Server error" });
    }
};