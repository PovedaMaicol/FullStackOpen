// import { parse } from "uuid";
// import data from "../data/diagnoses";
import { NewPatientEntry, Gender, Entry, EntryWithoutId, HealthCheckRating, DiagnoseEntry } from "./types";

//IMPORTANTE
// esta funcion es una guardia de tipo, deveuelve un booleano 
// esta funcion tiene un predicado: 'text is string'
// la forma de un predicado es 'parameterName is Type'
//parameterName: el nombre del parametro
//Type: es el tipo objetivo
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const parseString = (name: unknown): string => {
    if(!name || !isString(name)) {
        throw new Error('Incorrect or missing name')
    }
    return name;
}


const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date))
}

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date))  {
        throw new Error('Incorrect or missing date: ' +  date)
    }
    return date;
}

const isSsn = (ssn: unknown): ssn is string => {
    return typeof ssn === 'string' || ssn instanceof String;
}

const parseSsn = (ssn: unknown): string => {
    if(!ssn || !isSsn(ssn)) {
        throw new Error('Incorrect or missing ssn')
    }
    return ssn;
}



const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param)
};

const parseGender = (gender: unknown): Gender => {
    if(!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender ' + gender);
    }
    return gender;
}



const isOccupation = (txt: unknown): txt is string => {
    return typeof txt === 'string' || txt instanceof String;
}

const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isOccupation(occupation)) {
        throw new Error('Incorrect or missing occupation')
    }
    return occupation;
}
const isEntry = (entry: unknown): entry is Entry => {
    if (!entry || typeof entry !== 'object' || !('type' in entry)) {
      return false;
    }
  
    const entryType = (entry as Entry).type;
    return entryType === 'HealthCheck' || entryType === 'Hospital' || entryType === 'OccupationalHealthcare';
  };
  
  const parseEntries = (entries: unknown): Entry[] => {
    if (!Array.isArray(entries) || !entries.every(isEntry)) {
      throw new Error('Incorrect or missing entries');
    }
    return entries;
  };
  


const parseDischarge = (discharge: unknown): {date: string; criteria: string} => {
    if(
        !discharge || 
        typeof discharge !== 'object' ||
        !('date' in discharge) || 
        !('criteria' in discharge)
    ) {
        throw new Error('Incorrect or missing discharge information');
    }

    const dischargeObj = discharge as { date: unknown; criteria: unknown };

    if (!isString(dischargeObj.date) || !isDate(dischargeObj.date)) {
        throw new Error('Incorrect or missing discharge date')
    }

    if(!isString(dischargeObj.criteria)) {
        throw new Error('Incorrect or missing discharge criteria');
    }
    
    return {
        date: dischargeObj.date,
        criteria: dischargeObj.criteria
    };

};

const parseSickLeave = (sickLeave: unknown): { startDate: string; endDate: string } | undefined => 
    {
        if(!sickLeave) {
            return undefined;
        }

        if(
            typeof sickLeave !== 'object' || 
            !('startDate' in sickLeave) || 
            !('endDate' in sickLeave)
        ) {
            throw new Error('Incorrect or missing sickLeave information')
        }

        const sickLeaveObj = sickLeave as { startDate: unknown; endDate: unknown };

        if(!isString(sickLeaveObj.startDate) || !isDate(sickLeaveObj.startDate)) {
            throw new Error('incorrect or missing startDate in sickLeave');
        }

        if(!isString(sickLeaveObj.endDate) || !isDate
        (sickLeaveObj.endDate)) {
             throw new Error('incorrect or missing endDate in sickLeave');
         }

        return {
            startDate: sickLeaveObj.startDate,
            endDate: sickLeaveObj.endDate,
        };

    };

    const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
        if (rating === undefined || typeof rating !== 'number' || !Object.values(HealthCheckRating).includes(rating)) {
          throw new Error('Incorrect or missing health check rating');
        }
        return rating as HealthCheckRating;
      };
      


      export const parseDiagnosisCodes = (object: unknown): Array<DiagnoseEntry['code']> => {
        if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
            return [];
        }

        const diagnosisCodes = (object as {diagnosisCodes: unknown}).diagnosisCodes;

        console.log('diagnosisCodes:', diagnosisCodes);

        if (!Array.isArray(diagnosisCodes) || !diagnosisCodes.every(isString)) {
                throw new Error('Diagnosis codes must be an array of strings');
        }

        return diagnosisCodes as Array<DiagnoseEntry['code']>
     };

      
const toNewPatientEntry = (object: unknown): NewPatientEntry => {

    if(!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if('occupation' in object && 'gender' in object && 'ssn' in object && 'dateOfBirth' in object && 'name' in object && 'entries' in object){
        const newEntry: NewPatientEntry = {
            name: parseString(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: parseEntries(object.entries)
        };

        return newEntry;
    } 
   
    throw new Error('Incorrect data: some fields are missing');
}

const toNewEntry = (object: unknown): EntryWithoutId => {
    if(!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
    }

    const baseEntry = {
        description: parseString((object as { description: unknown }).description),
        date: parseDate((object as { date: unknown }).date),
        specialist: parseString((object as { specialist: unknown }).specialist),
        diagnosisCodes: parseDiagnosisCodes(object),
      };


    switch ((object as {type: string}).type) {
        case "Hospital":
            return {
                ...baseEntry,
                type: "Hospital",
                discharge: parseDischarge((object as {discharge: unknown}).discharge),
            };
        case "OccupationalHealthcare":
            return {
                ...baseEntry,
                type: "OccupationalHealthcare",
                employerName: parseString((object as { employerName: unknown }).employerName),
                sickLeave: parseSickLeave((object as {sickLeave: unknown}).sickLeave),
            };
        case "HealthCheck":
            return {
                ...baseEntry,
                type: "HealthCheck",
                healthCheckRating: parseHealthCheckRating((object as { healthCheckRating: unknown }).healthCheckRating),
            };
        default: 
        throw new Error(`Incorrect entry type: ${(object as { type: unknown }).type}`)

    }
}

export { toNewPatientEntry, toNewEntry };
