let interviewingList = [];
let rejrectedingList = [];
let currentFilter = 'all-filter-btn';

const totalEl = document.getElementById('total');
const interviewingEl = document.getElementById('interviewingCount');
const rejectedEl = document.getElementById('rejrectedingCount');
const tabHeaderCount = document.getElementById('current-tab-count');
const allCardSection = document.getElementById('allCards');
const filterSection = document.getElementById('filtered-section');
const noJobsView = document.getElementById('no-jobs-view');
const mainContainer = document.querySelector('main');


function updateDashboard() {
    const totalCount = allCardSection.querySelectorAll('.card').length;
    totalEl.innerText = totalCount;
    interviewingEl.innerText = interviewingList.length;
    rejectedEl.innerText = rejrectedingList.length;

    let currentListSize = 0;
    if (currentFilter === 'all-filter-btn') {
        currentListSize = totalCount;
        allCardSection.classList.toggle('hidden', currentListSize === 0);
        filterSection.classList.add('hidden');
    } else if (currentFilter === 'interviewing-filter-btn') {
        currentListSize = interviewingList.length;
        filterSection.classList.toggle('hidden', currentListSize === 0);
        allCardSection.classList.add('hidden');
    } else {
        currentListSize = rejrectedingList.length;
        filterSection.classList.toggle('hidden', currentListSize === 0);
        allCardSection.classList.add('hidden');
    }

    tabHeaderCount.innerText = `${currentListSize} jobs`;
    noJobsView.classList.toggle('hidden', currentListSize > 0);
}


function toggleStyle(id) {
    currentFilter = id;
    const buttons = ['all-filter-btn', 'interviewing-filter-btn', 'rejecteding-filter-btn'];
    buttons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        btn.className = (btnId === id) 
            ? "bg-[#3B82F6] text-white px-6 py-2 rounded-lg font-medium transition-all" 
            : "bg-white text-gray-600 border border-gray-200 px-6 py-2 rounded-lg font-medium transition-all";
    });

    if (id === 'interviewing-filter-btn') renderList(interviewingList, 'INTERVIEW');
    else if (id === 'rejecteding-filter-btn') renderList(rejrectedingList, 'REJECTED');
    updateDashboard();
}


mainContainer.addEventListener('click', function (event) {
    const card = event.target.closest('.card');
    if (!card) return;

    if (event.target.closest('.btn-delete')) {
        const companyId = card.querySelector('.companyName').innerText;
        card.remove();
        interviewingList = interviewingList.filter(item => item.companyName !== companyId);
        rejrectedingList = rejrectedingList.filter(item => item.companyName !== companyId);
        updateDashboard();
        if (currentFilter !== 'all-filter-btn') toggleStyle(currentFilter);
        return;
    }

    const isInterview = event.target.classList.contains('interviewing-btn');
    const isRejected = event.target.classList.contains('rejecteding-btn');

    if (isInterview || isRejected) {
        const cardData = {
            companyName: card.querySelector('.companyName').innerText,
            titleName: card.querySelector('.titleName').innerText,
            workName: card.querySelector('.workName').innerText,
            dicText: card.querySelector('.dicText').innerText
        };

        if (isInterview) {
            if (!interviewingList.some(i => i.companyName === cardData.companyName)) interviewingList.push(cardData);
            rejrectedingList = rejrectedingList.filter(i => i.companyName !== cardData.companyName);
            card.querySelector('.notApplied').innerText = 'APPLIED';
        } else {
            if (!rejrectedingList.some(r => r.companyName === cardData.companyName)) rejrectedingList.push(cardData);
            interviewingList = interviewingList.filter(i => i.companyName !== cardData.companyName);
            card.querySelector('.notApplied').innerText = 'REJECTED';
        }

        updateDashboard();
        if (currentFilter !== 'all-filter-btn') toggleStyle(currentFilter);
    }
});


function renderList(list, statusText) {
    filterSection.innerHTML = '';
    list.forEach(item => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card flex justify-between border p-8 rounded-lg bg-white';
        cardDiv.innerHTML = `
            <div class="space-y-6">
                <div>
                    <p class="companyName text-4xl font-bold text-[#002C5C]">${item.companyName}</p>
                    <p class="titleName text-lg text-gray-700">${item.titleName}</p>
                    <p class="workName text-gray-500">${item.workName}</p>
                </div>
                <div>
                    <button class="notApplied bg-[#EEF4FF] p-2.5 rounded-sm text-[#002C5C] font-medium text-[14px] uppercase">${statusText}</button>
                    <p class="dicText mt-2">${item.dicText}</p>
                </div>
                <div class="flex gap-5">
                    <button class="interviewing-btn bg-white px-4 py-2 border-[3px] border-[#10B981] text-[#10B981] rounded-sm font-bold">interview</button>
                    <button class="rejecteding-btn bg-white px-4 py-2 border-[3px] border-[#EF4444] text-[#EF4444] rounded-sm font-bold">Rejected</button>
                </div>
            </div>
            <div><button class="btn-delete bg-[#F1F2F4] p-3 rounded-full hover:text-red-500"><i class="fa-regular fa-trash-can"></i></button></div>`;
        filterSection.appendChild(cardDiv);
    });
}

updateDashboard();