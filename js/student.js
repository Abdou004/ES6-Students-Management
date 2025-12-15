import {ENDPOINT} from "./constant.js";

export default class Student {
    constructor(name,birthDate,major,note){
        this.name = name;
        this.birthDate = birthDate;
        this.major = major;
        this.note = note;
    }

    static MAX_NOTE = 20;
    
   static calculateAge (birthDate){
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();    
    return age;    
    }
    static all = async function(){
        const response = await fetch(ENDPOINT);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const students = await response.json();
        return students;
    }

    
    static create = async function(data) {
        // Get all existing students to calculate next ID
        const allStudents = await this.all();
        const intNote = parseInt(data.note, 10);
            

        const maxId = allStudents.length > 0 
            ? Math.max(...allStudents.map(s => parseInt(s.id, 10))) 
            : 0;
        
        // Add auto-incremented ID to the data
        const dataWithId = { ...data, note: intNote , id: (maxId + 1).toString() };
        
        const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataWithId)
        });
        return await response.json();
    }
    //Is Admittwd
    static isAdmitted(note){
        const mark = note >= 10 ? 'Admitted' : 'Not Admitted';
        return mark;
        }
    // Delete student
static delete = async function(id) {
    if (id === undefined || id === null) throw new Error('Missing id for delete');
    const url = `${ENDPOINT}${id}`;
    const response = await fetch(url, { method: 'DELETE' });
    if (!response.ok) throw new Error(`Delete failed: ${response.status}`);
    return true;
}
}