export class AutoComplete{
    private treeHead: node;
    private searchSpace: string[];

    public constructor(_searchSpace: string[]){
        this.searchSpace = [..._searchSpace];
        this.generateTree();
    }

    //returns the auto complete values given the current search state 
    public getAutoCompleteList(searchState: string){
        let ret = [];
        //step one: walk tree to get to search state
        cur = this.treeHead;
        for(let char in searchSpace){
            let nextNodeIndex = -1; 
            for(let i = 0; i < cur.children.length; i++){
                nextNodeIndex = cur.children[i] === char ? i : nextNodeIndex;
            }
            if(nextNodeIndex == -1){
                //nothing matches our search
                return []
            }
        }
        //step two: get all nodes
        //
        return ret;
    }


    private generateTree(){
        this.treeHead = node("");
        this.searchSpace.foreach((searchString) => {
            let cur : Node = this.treeHead;
            for(let char of searchString){
                //finds if the next node is in children
                let nextNodeIndex = -1;
                for(let i = 0; i < cur.children.length; i++){
                    nextNodeIndex = cur.children[i] === char ? i : nextNodeIndex;
                }

                if(nextNodeIndex == -1){
                //need to make node  
                    newNode = new Node(char);
                    cur.children.push(newNode);
                    cur = newNode;

                }else{
                    //next node already exists
                    cur = cur.children[nextNodeIndex];
                }

            }
                cur.mark = true;
        });        

    }



}



class Node{
    //points to children of the node
    public children: Node[];
    //denotes that this is a finishing node
    public mark: boolean;
    public val: string;
    public constructor(_val){
        this.mark = false;
        this.val = new String(_val);
        this.children = [];

    }
}
