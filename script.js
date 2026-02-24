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