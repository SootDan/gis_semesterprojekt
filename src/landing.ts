const subjTable = document.getElementById("subj_table") as HTMLTableElement;
const option1Test = document.getElementById("subj_0_edit") as HTMLInputElement;
//option1Test.addEventListener("click", editSubject);


/** Hides/unhides the table row for each subject.
 * Lets user edit the subject at will.
 */
function editSubject() {
    // TODO: Add every subject as an option also make it do... anything, really.
    const getTdSubj = document.getElementById("subj_0_edit_tr") as HTMLTableElement;
    if (getTdSubj.classList.contains("subject_edit"))
        getTdSubj.className = "subject_edit_visible";
    else
        getTdSubj.className = "subject_edit";
}


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
    
    let stats = timeStillNeeded / daysUntilDeadline;
    
    if (timeUnit == "timeWeeks")
        stats *= 7;
    else if (timeUnit == "timeMonths")
        stats *= 30;

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
        for (const unit of timeUnits) {
            const td = document.getElementById(`subj_${i}_${unit}`);
            if (td === null)
                return;
            if (deadline == noDeadline)
                td.textContent = "N/A";
            else
                td.textContent = getDaysUntilDeadline(deadline, timeStillNeeded, unit);
        }
    }
}


timerMath();