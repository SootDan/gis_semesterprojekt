const subjTable = document.getElementById("subj_table") as HTMLTableElement;

/**
 * This adds the necessary data for a deadline.
 * Handles days, weeks, and months until deadline.
 */
function getDaysUntilDeadline(deadline: Date, timeStillNeeded: number,
    timeUnit: string) {
    const today = new Date().getTime();
    const future = deadline? deadline.getTime() : today;
    const timeUntilDeadline = Math.abs(future - today);
    const daysUntilDeadline = Math.ceil(timeUntilDeadline / (1000 * 3600 * 24));
    
    let stats: number;
    
    if (timeUnit == "timeDays")
        stats = daysUntilDeadline / timeStillNeeded;
    else if (timeUnit == "timeWeeks")
        stats = (daysUntilDeadline / 7) / timeStillNeeded;
    else
        stats = (daysUntilDeadline / 30) / timeStillNeeded;

    return stats.toFixed(2);
}


/**
 * Sets up the timer math for each individual user.
 */
function timerMath() {
    const subjRows = subjTable.childElementCount;
    const timeUnits = ["timeDays", "timeWeeks", "timeMonths"];
    const noDeadline = new Date();

    for (let i = 0; i < subjRows; i++) {
        const subject = document.getElementById(`subj_${i}`);
        if (subject === null)
            return;

        const deadlineText = document.getElementById(`subj_${i}_deadline`)?.textContent;
        const deadline: Date = deadlineText? new Date(deadlineText) : noDeadline;

        const timeStillNeeded = Number(document.getElementById(`subj_${i}_timeReq`)?.textContent)
        - Number(document.getElementById(`subj_${i}_timeDone`)?.textContent);

        // Start at Hrs/Day and ignore the first entries
        for (let j = 0; j < timeUnits.length; j++) {
            const td = document.getElementById(`subj_${i}_${timeUnits[j]}`);
            if (td === null)
                return;
            if (deadline == noDeadline)
                td.textContent = "N/A";
            else if (td != null)
                td.textContent = getDaysUntilDeadline(deadline, timeStillNeeded, timeUnits[j]);
        }
    }
}


timerMath();