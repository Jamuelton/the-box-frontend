class CustomStack(object):

    def __init__(self, maxSize):
        self.stack = []
        self.maxLength = maxSize
        """
        :type maxSize: int
        """
        

    def push(self, x):
        if len(self.stack) < self.maxLength:
            self.stack.append(x)
        
    def pop(self):
        if len(self.stack) > 0:
            return self.stack.pop()
        return -1
    
    def increment(self, k, val):
        n = min(k, len(self.stack))
        for i in range(n):
            self.stack[i] += val


obj = CustomStack(5)
obj.push(3)
obj.push(3)
obj.push(3)
obj.push(3)
obj.push(3)
obj.push(3)
obj.push(3)
param_2 = obj.pop()
obj.increment(1,100)

print(obj.stack)

