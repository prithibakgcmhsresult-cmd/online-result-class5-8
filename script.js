

const webAppUrl = "https://script.google.com/macros/s/AKfycbzYMjzKhbpvw5FWTOvvwzRP8xW7AQjafOz3g74nSNgzuapCwNrx8PLZAvA2qUiVui1E/exec";

const subjects = [
    { name: "BENGALI", prefix: "ben" },
    { name: "ENGLISH", prefix: "eng" },
    { name: "ARABIC/SANSKRIT (3RD)", prefix: "ara" },
    { name: "MATHEMATICS", prefix: "mat" },
    { name: "ENVIRONMENT AND SCIENCE", prefix: "sci" },
    { name: "ENVIRONMENT AND GEOGRAPHY", prefix: "geo" },
    { name: "ENVIRONMENT AND HISTORY", prefix: "his" }
];
document.getElementById('searchBtn').addEventListener('click', async function() {
    const year = document.getElementById('yearInput').value.trim();
    const name = document.getElementById('nameInput').value.trim();
    const cls = document.getElementById('classInput').value;
    const roll = document.getElementById('rollInput').value.trim();
    const status = document.getElementById('status-msg');
    const container = document.getElementById('cardContainer');
    
    if(!year || !name || !cls || !roll) { 
        status.style.color = "red";
        status.innerText = "দয়া করে চারটি ফিল্ডই সঠিকভাবে পূরণ করুন!"; 
        return; 
    }
    
    status.style.color = "blue";
    status.innerText = "তথ্য খোঁজা হচ্ছে, অপেক্ষা করুন...";
    container.style.display = 'none';
    
    try {
        const url = `${webAppUrl}?year=${encodeURIComponent(year)}&name=${encodeURIComponent(name)}&class=${encodeURIComponent(cls)}&roll=${encodeURIComponent(roll)}`;
        const res = await fetch(url);
        const d = await res.json();
        
        if(d.error) { 
            status.style.color = "red";
            status.innerText = d.error; 
            return; 
        }
        
        status.innerText = ""; 

        document.getElementById('d_id').innerText = d.id || '';
        document.getElementById('d_name').innerText = d.name || '';
        document.getElementById('d_roll').innerText = d.roll || '';
        document.getElementById('d_class').innerText = d.class || '';
        document.getElementById('d_year').innerText = d.year || '';

      let subHtml = '';
        subjects.forEach(s => {
            subHtml += `<tr>
                <td class="subj-name">${s.name}</td>
                <td>${d[s.prefix+'_f1a']||''}</td><td>${d[s.prefix+'_f1b']||''}</td><td>${d[s.prefix+'_f1c']||''}</td>
                <td>${d[s.prefix+'_f2a']||''}</td><td>${d[s.prefix+'_f2b']||''}</td><td>${d[s.prefix+'_f2c']||''}</td>
                <td>${d[s.prefix+'_f3a']||''}</td><td>${d[s.prefix+'_f3b']||''}</td><td>${d[s.prefix+'_f3c']||''}</td>
                <td>${d[s.prefix+'_s1']||''}</td><td>${d[s.prefix+'_s2']||''}</td><td>${d[s.prefix+'_s3']||''}</td>
               <td>${d[s.prefix+'_total']||''}</td><td>${d[s.prefix+'_per'] ? Number(d[s.prefix+'_per']).toFixed(1) : ''}</td>

            </tr>`;
        });
        
        
        subHtml += `<tr>
            <td class="subj-name">ART & WORK EDUCATION</td>
            <td>${d.art_f1a||''}</td><td>${d.art_f1b||''}</td><td>${d.art_f1c||''}</td>
            <td>${d.art_f2a||''}</td><td>${d.art_f2b||''}</td><td>${d.art_f2c||''}</td>
            <td>${d.art_f3a||''}</td><td>${d.art_f3b||''}</td><td>${d.art_f3c||''}</td>
            <td>${d.art_s1||''}</td><td>${d.art_s2||''}</td><td>${d.art_s3||''}</td>
            <td>${d.art_total||''}</td><td>${d.art_per ? Number(d.art_per).toFixed(1) : ''}</td>
         </tr>`;
        
        
        subHtml += `<tr>
            <td class="subj-name">HEALTH & PHYSICAL EDUCATION</td>
            <td>${d.hlth_f1a||''}</td><td>${d.hlth_f1b||''}</td><td>${d.hlth_f1c||''}</td>
            <td>${d.hlth_f2a||''}</td><td>${d.hlth_f2b||''}</td><td>${d.hlth_f2c||''}</td>
            <td>${d.hlth_f3a||''}</td><td>${d.hlth_f3b||''}</td><td>${d.hlth_f3c||''}</td>
            <td>${d.hlth_s1||''}</td><td>${d.hlth_s2||''}</td><td>${d.hlth_s3||''}</td>
            <td>${d.hlth_total||''}</td><td>${d.hlth_per||''}</td>
        </tr>`;
        
        
        subHtml += `<tr style="background:#cfd8dc; font-weight:bold;">
            <td class="subj-name">Total</td>
            <td>${d.tot_f1a||''}</td><td>${d.tot_f1b||''}</td><td>${d.tot_f1c||''}</td>
            <td>${d.tot_f2a||''}</td><td>${d.tot_f2b||''}</td><td>${d.tot_f2c||''}</td>
            <td>${d.tot_f3a||''}</td><td>${d.tot_f3b||''}</td><td>${d.tot_f3c||''}</td>
            <td>${d.tot_s1||''}</td><td>${d.tot_s2||''}</td><td>${d.tot_s3||''}</td>
            <td>${d.grand_total||''}</td><td>${d.grand_per||''}</td>
        </tr>`;
        
        document.getElementById('subjectRows').innerHTML = subHtml;

        
        document.getElementById('cognitiveRows').innerHTML = `
            <tr><td style="text-align:left;">Pattern of intelligence</td><td>${d.cog_1||''}</td><td>${d.cog_8||''}</td><td>${d.cog_15||''}</td></tr>
            <tr><td style="text-align:left;">Area of interest</td><td>${d.cog_2||''}</td><td>${d.cog_9||''}</td><td>${d.cog_16||''}</td></tr>
            <tr><td style="text-align:left;">Positive attitude</td><td>${d.cog_3||''}</td><td>${d.cog_10||''}</td><td>${d.cog_17||''}</td></tr>
            <tr><td style="text-align:left;">Exceptional ability</td><td>${d.cog_4||''}</td><td>${d.cog_11||''}</td><td>${d.cog_18||''}</td></tr>
            <tr><td style="text-align:left;">Features of anxiety</td><td>${d.cog_5||''}</td><td>${d.cog_12||''}</td><td>${d.cog_19||''}</td></tr>
            <tr><td style="text-align:left;">Learning gaps</td><td>${d.cog_6||''}</td><td>${d.cog_13||''}</td><td>${d.cog_20||''}</td></tr>
            <tr><td style="text-align:left;">Specific learning difficulties</td><td>${d.cog_7||''}</td><td>${d.cog_14||''}</td><td>${d.cog_21||''}</td></tr>`;

        
        document.getElementById('behavioralRows').innerHTML = `
            <tr><td style="text-align:left;">Self Awareness</td><td>${d.beh_1||''}</td><td>${d.beh_12||''}</td><td>${d.beh_23||''}</td></tr>
            <tr><td style="text-align:left;">Communication Skill</td><td>${d.beh_2||''}</td><td>${d.beh_13||''}</td><td>${d.beh_24||''}</td></tr>
            <tr><td style="text-align:left;">Collaborative Thinking/Classification</td><td>${d.beh_3||''}</td><td>${d.beh_14||''}</td><td>${d.beh_25||''}</td></tr>
            <tr><td style="text-align:left;">Experiential Learning Skill</td><td>${d.beh_4||''}</td><td>${d.beh_15||''}</td><td>${d.beh_26||''}</td></tr>
            <tr><td style="text-align:left;">Critical Thinking</td><td>${d.beh_5||''}</td><td>${d.beh_16||''}</td><td>${d.beh_27||''}</td></tr>
            <tr><td style="text-align:left;">Computational / Analytical thinking</td><td>${d.beh_6||''}</td><td>${d.beh_17||''}</td><td>${d.beh_28||''}</td></tr>
            <tr><td style="text-align:left;">Problem Solving / Drawing Conclusion</td><td>${d.beh_7||''}</td><td>${d.beh_18||''}</td><td>${d.beh_29||''}</td></tr>
            <tr><td style="text-align:left;">Decision Making Skill</td><td>${d.beh_8||''}</td><td>${d.beh_19||''}</td><td>${d.beh_30||''}</td></tr>
            <tr><td style="text-align:left;">Creative Presentation Skill</td><td>${d.beh_9||''}</td><td>${d.beh_20||''}</td><td>${d.beh_31||''}</td></tr>
            <tr><td style="text-align:left;">Aesthetic Appreciation</td><td>${d.beh_10||''}</td><td>${d.beh_21||''}</td><td>${d.beh_32||''}</td></tr>
            <tr><td style="text-align:left;">Teacher’s Perception (Overall)</td><td>${d.beh_11||''}</td><td>${d.beh_22||''}</td><td>${d.beh_33||''}</td></tr>`;

        
        document.getElementById('personalityRows').innerHTML = `
            <tr><td style="text-align:left;">Listening Skill</td><td>${d.ps_1||''}</td></tr><tr><td style="text-align:left;">Communication Skill</td><td>${d.ps_2||''}</td></tr>
            <tr><td style="text-align:left;">Empathy Skill</td><td>${d.ps_3||''}</td></tr><tr><td style="text-align:left;">Co-operation Skill</td><td>${d.ps_4||''}</td></tr>
            <tr><td style="text-align:left;">Conversation Skill</td><td>${d.ps_5||''}</td></tr><tr><td style="text-align:left;">Friendship Skill</td><td>${d.ps_6||''}</td></tr>
            <tr><td style="text-align:left;">Conflict resolution/ Problem solving Skill</td><td>${d.ps_7||''}</td></tr><tr><td style="text-align:left;">Stress coping Skill</td><td>${d.ps_8||''}</td></tr>
            <tr><td style="text-align:left;">Decision making Skill</td><td>${d.ps_9||''}</td></tr><tr><td style="text-align:left;">Interpersonal Skill</td><td>${d.ps_10||''}</td></tr>
            <tr><td style="text-align:left;">Organisational Skill</td><td>${d.ps_11||''}</td></tr><tr><td style="text-align:left;">Emotion Control Skill</td><td>${d.ps_12||''}</td></tr>
            <tr><td style="text-align:left;">Respect Skill</td><td>${d.ps_13||''}</td></tr><tr><td style="text-align:left;">Assertiveness Skill</td><td>${d.ps_14||''}</td></tr>
            <tr><td style="text-align:left;">Leadership</td><td>${d.ps_15||''}</td></tr>`;
        
        container.style.display = 'block';
    } catch (err) { 
        status.style.color = "red"; 
        status.innerText = "সার্ভার থেকে তথ্য লোড করতে ত্রুটি হয়েছে!"; 
        console.error(err); 
    }
});
document.getElementById('printBtn').addEventListener('click', function() {
    window.print();
});
