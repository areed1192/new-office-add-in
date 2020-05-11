/**
 * Adds two numbers.
 * @customfunction
 * @param first First number
 * @param second Second number
 * @returns The sum of the two numbers.
 */
/* global clearInterval, console, setInterval */
export function add(first: number, second: number): number {
    return first + second;
  }
  
  /**
   * Displays the current time once a second.
   * @customfunction
   * @param invocation Custom function handler
   */
  export function clock(invocation: CustomFunctions.StreamingInvocation<string>): void {
    const timer = setInterval(() => {
      const time = currentTime();
      invocation.setResult(time);
    }, 1000);
  
    invocation.onCanceled = () => {
      clearInterval(timer);
    };
  }
  
  /**
   * Returns the current time.
   * @returns String with the current time formatted for the current locale.
   */
  export function currentTime(): string {
    return new Date().toLocaleTimeString();
  }
  
  /**
   * Increments a value once a second.
   * @customfunction
   * @param incrementBy Amount to increment
   * @param invocation Custom function handler
   */
  export function increment(incrementBy: number, invocation: CustomFunctions.StreamingInvocation<number>): void {
    let result = 0;
    const timer = setInterval(() => {
      result += incrementBy;
      invocation.setResult(result);
    }, 1000);
  
    invocation.onCanceled = () => {
      clearInterval(timer);
    };
  }
  
  /**
   * Writes a message to console.log().
   * @customfunction LOG
   * @param message String to write.
   * @returns String to write.
   */
  export function logMessage(message: string): string {
    console.log(message);
  
    return message;
  }
  
  
  /**
   * Unpivot a range of data, into a normalized output.
   * @customfunction UNPIVOT
   * @param {any[][]} headers The range of cells that represent the header values.
   * @param {any[][]} rows The range of cells that represent the row header values.
   * @param {any[][]} values The range of cells that represent values.
   * @returns {any[][]} The normalized range of cells.
   */
  export function unpivot(headers: any[][], rows: any[][], values: any[][]): any[][] {
  
    // Define an empty array to store our normalized rows as we create them.
    let unpivot_range = [];
  
    // Intializes the count for the headers.
    let header_count = 0;
  
    // Loop through each element in the row header.
    headers[0].forEach(value => {
  
      // Initalize our row count.
      let row_count = 0;
  
      // Loop through each row in the Rows collection.
      rows.forEach(row_element => {
  
        // Initalize our new row
        let new_row = [];
  
        // Grab all the values.
        new_row[0] = value;
        new_row[1] = row_element[0];
        new_row[2] = values[row_count][header_count];
  
        // Add to the main array.
        unpivot_range.push(new_row);
        row_count = row_count + 1
  
      });
  
      header_count = header_count + 1;
  
    });
  
    return unpivot_range;
  
  }
  